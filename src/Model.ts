import pluralize from "pluralize";
import Templates from "./Templates";

import * as fs from "fs";
import * as path from "path";

export class Model {
   static capitalizedName: string = "";
   static pluralName: string = "";
   static controller_name: string = "";
   static model_interface: string = "";
   static model_schema_name: string = "";
   static model_name: string = "";
   static route_name: string = "";
   static route_type: string = "";

   static replaceAll(text: string): string {

      return text
         .split("{{controller_name}}").join(this.controller_name)
         .split("{{model_interface}}").join(this.model_interface)
         .split("{{model_schema_name}}").join(this.model_schema_name)
         .split("{{model_name}}").join(this.model_name)
         .split("{{route_name}}").join(this.route_name)
         .split("{{route_path}}").join(this.pluralName.toLowerCase())
         .split("{{route_type}}").join(this.route_type);
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
   static Create(name: string, options: any) {
      let cwd = process.cwd();

      // Generate all required names
      this.capitalizedName = name.substr(0, 1).toUpperCase() + name.slice(1).toLowerCase();
      this.pluralName = pluralize(this.capitalizedName);
      this.controller_name = this.pluralName + "Controller";
      this.model_interface = "I" + this.capitalizedName;
      this.model_schema_name = this.capitalizedName + "Schema";
      this.model_name = this.capitalizedName;
      this.route_name = this.capitalizedName + "Routes";
      this.route_type = options.api === true ? "api" : "web";
      // Generate Model
      let model = this.replaceAll(Templates.model);

      // Check if src/Models folder exists,
      // if it doesn't then create it
      this.createIfDoesntExist(path.join(cwd, "src", "Models"));

      // Check if that model already exists,
      // if it does then abort
      // else write model to the file
      if (fs.existsSync(path.join(cwd, "src", "Models", this.model_name + ".ts")))
         return console.log(this.model_name + " already exists, aborting!");
      else
         fs.writeFileSync(path.join(cwd, "src", "Models", this.model_name + ".ts"), model);
   }
}
