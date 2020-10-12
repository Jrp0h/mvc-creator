import * as fs from "fs";
import * as path from "path";

export default class Helper {
   static createDirectoryIfDoesntExist(folder: string) {
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
}
