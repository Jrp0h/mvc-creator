import * as path from "path";
import * as child_process from "child_process";

import Helper from "./Helper";
import Templates from "./Templates";

export class Project {

    static projectName: string = "";


    static replaceAll(text: string): string {

        return text
            .split("{{project_name}}").join(this.projectName);
    }

    static async Create(name: string, options: any) {

        let cwd = process.cwd();

        this.projectName = name;

        if (Helper.createDirectoryIfDoesntExist(path.join(cwd, name))) {
            console.error("Project already exists. ABORTING");
            return;
        }

        // Change directory
        cwd = path.join(cwd, name);


        // Write package.json file
        Helper.writeFileIfDoesntExist(path.join(cwd, "package.json"), this.replaceAll(Templates.package));

        // Write tsconfig
        Helper.writeFileIfDoesntExist(path.join(cwd, "tsconfig.json"), this.replaceAll(Templates.tsconfig));

        // Create src and dist folders
        Helper.createDirectoryIfDoesntExist(path.join(cwd, "src"));
        Helper.createDirectoryIfDoesntExist(path.join(cwd, "dist"));

        // Create controllers, Models, Routes and Utils folders
        Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Controllers"));
        Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Models"));
        Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Utils"));
        Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Routes"));

        Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Routes", "api"));

        // Create Utils classes
        Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Utils", "ErrorHandeling.ts"), this.replaceAll(Templates.utils_error_handeling_ts));
        Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Utils", "Str.ts"), this.replaceAll(Templates.utils_str_ts));

        // Create API routes container
        Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Routes", "API.ts"), this.replaceAll(Templates.routes_api_ts));

        //create main
        Helper.writeFileIfDoesntExist(path.join(cwd, "src", "main.ts"), this.replaceAll(Templates.main_ts));

        // Write .env file
        Helper.writeFileIfDoesntExist(path.join(cwd, ".env"), Templates.dotenv);
        Helper.writeFileIfDoesntExist(path.join(cwd, ".env.example"), Templates.dotenv);

        // Write .gitignore
        Helper.writeFileIfDoesntExist(path.join(cwd, ".gitignore"), Templates.gitignore);

        // Install all dependencies
        child_process.execSync("npm i", { cwd, stdio: [0, 1, 2] });

        console.log("Project created");
    }
}
