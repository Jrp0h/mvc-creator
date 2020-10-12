import * as path from "path";
import * as child_process from "child_process";

import Helper from "./Helper";
import Templates from "./Templates";

export class Middleware {

   static capitalizedName: string = "";

   static async Create(name: string, options: any) {

      let cwd = process.cwd();

      this.capitalizedName = name.substr(0, 1).toUpperCase() + name.slice(1);

      Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Middlewares"));

      // Write file
      Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Middlewares", this.capitalizedName + "Middleware.ts"), Templates.middleware);

      console.log("Middleware created successfully!");
   }
}
