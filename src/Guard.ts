import * as path from "path";

import Helper from "./Helper";
import Templates from "./Templates";

export class Guard {

   static capitalizedName: string = "";

   static async Create(name: string, options: any) {

      let cwd = process.cwd();

      this.capitalizedName = name.substr(0, 1).toUpperCase() + name.slice(1);

      Helper.createDirectoryIfDoesntExist(path.join(cwd, "src", "Guards"));

      // Write file
      Helper.writeFileIfDoesntExist(path.join(cwd, "src", "Guards", this.capitalizedName + "Guard.ts"), Templates.middleware);

      console.log("Guard created successfully!");
   }
}
