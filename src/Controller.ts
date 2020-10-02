import pluralize from "pluralize";
import Templates from "./Templates";
import {Model} from "./Model";

import * as fs from "fs";
import * as path from "path";


export class Controller {
   static capitalizedName: string = "";
   static pluralName: string = "";
   static controller_name: string = "";
   static model_interface: string = "";
   static model_schema_name: string = "";
   static model_name: string = "";
   static route_name: string = "";
   static route_type: string = "";

   static options: any;

   static replaceAll(text: string): string {

      let generate_everything_controller_model_import: string = "";

      if (this.options.everything === true)
         generate_everything_controller_model_import = `import ${this.model_name} from "../Models/${this.model_name}";`;


      return text
         .split("{{controller_name}}").join(this.controller_name)
         .split("{{model_interface}}").join(this.model_interface)
         .split("{{model_schema_name}}").join(this.model_schema_name)
         .split("{{model_name}}").join(this.model_name)
         .split("{{route_name}}").join(this.route_name)
         .split("{{route_path}}").join(this.pluralName.toLowerCase())
         .split("{{route_type}}").join(this.route_type)
         .split("{{generate_everything_controller_model_import}}").join(generate_everything_controller_model_import);
   }

   static createIfDoesntExist(folder: string) {
      if (!fs.existsSync(folder)) {
         fs.mkdirSync(folder)
         let last = folder.split("/");
         console.log("Created " + last[last.length - 1] + " directory");
         return false;
      }

      return true;
   }

   static writeFileIfDoesntExist(file: string, data: string) {

      if (!fs.existsSync(file)) {
         fs.writeFileSync(file, data);
         let last = file.split("/");
         console.log(`Created ${last[last.length - 1]} file`);
         return false;
      }
      return true;
   }

   static async Create(name: string, options: any) {

      let cwd = process.cwd();
      this.options = options;

      // Generate all required names
      name = pluralize.singular(name);
      this.capitalizedName = name.substr(0, 1).toUpperCase() + name.slice(1);
      this.pluralName = pluralize(this.capitalizedName);
      this.controller_name = this.pluralName + "Controller";
      this.model_interface = "I" + this.capitalizedName;
      this.model_schema_name = this.capitalizedName + "Schema";
      this.model_name = this.capitalizedName;
      this.route_name = this.capitalizedName + "Routes";
      this.route_type = options.api === true ? "api" : "web";

      // Check if src folder exists,
      // if it doesn't then create it
      this.createIfDoesntExist(path.join(cwd, "src"));

      // Check if src/Controllers folder exists,
      // if it doesn't then create it
      this.createIfDoesntExist(path.join(cwd, "src", "Controllers"));

      let controller = this.replaceAll(Templates.controller);

      // Check if that controller already exists,
      // if it does then abort
      if (fs.existsSync(path.join(cwd, "src", "Controllers", this.controller_name + ".ts")))
         return console.log(this.controller_name + " already exists, aborting!");
      else
         fs.writeFileSync(path.join(cwd, "src", "Controllers", this.controller_name + ".ts"), controller);


      // If it wants to generate everything
      // Then generate everything
      if (options.everything === true) {

         // Generate Model
         Model.Create(name, options);

         // Routes
         // Check if src/Routes folder exists,
         // if it doesn't then create it
         this.createIfDoesntExist(path.join(cwd, "src", "Routes"));

         let routesThing = this.replaceAll(Templates.routesHeader)
            + "\n" +
            this.replaceAll(Templates.routesTemplate)
            + "\n" +
            this.replaceAll(Templates.routesFooter);

         // Check if src/Routes/{{type}} file exists,
         // if it doesn't then create it
         if (this.writeFileIfDoesntExist(path.join(cwd, "src", "Routes", this.route_type.toUpperCase() + ".ts"), routesThing)) {

            let content = fs.readFileSync(path.join(cwd, "src", "Routes", this.route_type.toLowerCase() + ".ts"), {encoding: 'utf-8'});
            let lines = content.split("\n");

            let next = false;

            for (let i = lines.length - 1; i >= 0; i--) {
               if (next) {
                  lines.splice(i, 0, this.replaceAll(Templates.routesTemplate));
                  break;
               }
               if (lines[i].includes("export default"))
                  next = true;
            }

            fs.writeFileSync(path.join(cwd, "src", "Routes", this.route_type.toUpperCase() + ".ts"), lines.join("\n"));
         }


         // Check if src/Routes/{{type}} folder exists,
         // if it doesn't then create it
         this.createIfDoesntExist(path.join(cwd, "src", "Routes", this.route_type));

         let modelRoute = this.replaceAll(Templates.modelRoute);

         // Check if src/Routes/{{type}}/{{route_name}} file exists,
         // if it doesn't then create it
         if (fs.existsSync(path.join(cwd, "src", "Routes", this.route_type, this.route_name + ".ts")))
            return console.log(this.route_type + "/" + this.route_name + " already exists, aborting!");
         else
            fs.writeFileSync(path.join(cwd, "src", "Routes", this.route_type, this.route_name + ".ts"), modelRoute);
      }

      console.log("Successfully generated " + this.controller_name);
   }
}
