import * as path from "path";
import * as fs from "fs";

import Helper from "./Helper";
import Templates from "./Templates";

export class Dotenv {

   static async Create(p: string = "") {
      let cwd = p;

      if (p == "")
         cwd = process.cwd();

      // Write .env file
      Helper.writeFileIfDoesntExist(path.join(cwd, ".env"), Templates.dotenv);
      Helper.writeFileIfDoesntExist(path.join(cwd, ".env.example"), Templates.dotenv);
   }

   static async ViewKey() {
      Dotenv.GetValue("APP_KEY");
   }

   static async SetValue(key: string, value: string) {
      let file = Dotenv.ReadFile();

      if (file === false) {
         console.error(".env does not exist");
         return;
      }

      let compiledValue = key.toUpperCase() + "=" + value;

      let lines = file.split("\n");

      for (let i = 0; i < lines.length; i++) {
         let line = lines[i];

         if (line.trim().startsWith(key.toUpperCase())) {
            lines[i] = compiledValue;
            file = lines.join("\n");
            Dotenv.WriteFile(file);
            console.log(key.toUpperCase() + " is now " + value);
            return;
         }
      }

      if (lines.length == 1)
         lines[0] = compiledValue;
      else
         lines.push(compiledValue);

      file = lines.join("\n");
      Dotenv.WriteFile(file);

      console.log(key.toUpperCase() + " is now " + value);
   }

   static async GetValue(key: string) {
      let file = Dotenv.ReadFile();

      if (file === false) {
         console.error(".env does not exist");
         return;
      }

      let lines = file.split("\n");

      for (let line in lines) {
         if (line.trim().startsWith(key.toUpperCase())) {
            let v = line.split("=").slice(1).join("=");
            console.log(key.toUpperCase() + " is " + v);
            return;
         }
      }

      console.log("No value for " + key.toUpperCase());
   }

   static async RemoveKey(key: string) {
      let file = Dotenv.ReadFile();

      if (file === false) {
         console.error(".env does not exist");
         return;
      }

      let lines = file.split("\n");

      for (let i = 0; i < lines.length; i++) {
         let line = lines[i];

         if (line.trim().startsWith(key.toUpperCase())) {
            lines.splice(i, 1);
            file = lines.join("\n");
            Dotenv.WriteFile(file);
            console.log(key.toUpperCase() + " has been removed!");
            return;
         }
      }

      console.log(key.toUpperCase() + " has been removed!");
   }

   static Show() {
      let file = Dotenv.ReadFile();

      if (file === false) {
         console.error(".env does not exist");
         return;
      }

      console.log(file);
   }

   static async GenerateValue(key: string) {
      Dotenv.SetValue(key, Dotenv.Generate());
   }

   // set ext to ".example" to edit example file
   private static ReadFile(ext: string = "") {
      try {
         return fs.readFileSync(path.join(process.cwd(), ".env" + ext), {encoding: "utf8"});
      }
      catch (error) {
         console.error(error);
         return false;
      }

   }

   private static WriteFile(contents: string, ext: string = "") {
      try {
         return fs.writeFileSync(path.join(process.cwd(), ".env" + ext), contents);
      }
      catch (error) {
         console.error(error);
         return false;
      }
   }

   private static Generate(length: number = 30) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=?!_-.,$';
      let charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
   }
}
