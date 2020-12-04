import * as path from "path";

import Helper from "./Helper";
import Templates from "./Templates";

export default class Error {

   static capitalizedName: string;

   static replaceAll(text: string): string {

      return text
         .split("{{util_name}}").join(Error.capitalizedName);
   }

   static async Create(name: string) {

      Error.capitalizedName = name.substr(0, 1).toUpperCase() + name.slice(1);

      let cwd = process.cwd();

      Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Errors"));

      if (Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Errors", Error.capitalizedName + "Error.ts"), Error.replaceAll(Templates.error_class))) {
         console.error("Error with name " + Error.capitalizedName + " already exists");
         return;
      }

      console.log(Error.capitalizedName + "Error has been created!");
   }
}
