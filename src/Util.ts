import * as path from "path";

import Helper from "./Helper";
import Templates from "./Templates";

export default class Util {

   static capitalizedName: string;

   static replaceAll(text: string): string {

      return text
         .split("{{util_name}}").join(Util.capitalizedName);
   }

   static async Create(name: string) {

      Util.capitalizedName = name.substr(0, 1).toUpperCase() + name.slice(1);

      let cwd = process.cwd();

      Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Utils"));

      if (Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Utils", Util.capitalizedName + ".ts"), Util.replaceAll(Templates.util_class))) {
         console.error("Utility with name " + Util.capitalizedName + " already exists");
         return;
      }

      console.log("Utility " + Util.capitalizedName + " has been created!");
   }
}
