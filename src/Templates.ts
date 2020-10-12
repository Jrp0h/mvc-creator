export default class Templates {
   static controller: string = `import express, { Request, Response } from "express";

{{generate_everything_controller_model_import}}

export default class {{controller_name}} {

   static async Index(req: Request, res: Response)
   {

   }

   static async Store(req: Request, res: Response)
   {

   }

   static async Show(req: Request, res: Response)
   {
      const id = req.params.id;

   }

   static async Update(req: Request, res: Response)
   {
      const id = req.params.id;

   }

   static async Destroy(req: Request, res: Response)
   {
      const id = req.params.id;

   }
}`;

   static model: string = `import mongoose, { Schema, Document } from "mongoose";

export interface {{model_interface}} extends Document {
   _id: mongoose.Types.ObjectId;
}

const {{model_schema_name}}: Schema = new Schema({
   _id: Schema.Types.ObjectId
}, { versionKey: false });

{{model_schema_name}}.pre<{{model_interface}}>("save", function (next: any) {
   if(this._id == undefined) this._id = new mongoose.Types.ObjectId();

   next();
});

export default mongoose.model<{{model_interface}}>("{{model_name}}", {{model_schema_name}});
`;

   static routesHeader: string = `
import express from 'express'

let router: express.Router = express.Router();
`;

   static routesTemplate: string = `import {{route_name}} from '@/Routes/{{route_type}}/{{route_name}}';
router.use("/{{route_path}}", {{route_name}});
`;

   static routesFooter: string = `
export default router;
`;

   static modelRoute: string = `import express from "express";

import {{controller_name}} from "@/Controllers/{{controller_name}}";

let router = express.Router();

router.get("/", {{controller_name}}.Index);
router.post("/", {{controller_name}}.Store);

router.get("/:id", {{controller_name}}.Show);
router.patch("/:id", {{controller_name}}.Update);
router.delete("/:id", {{controller_name}}.Destroy);

export default router;
`;

   static package: string = `
{
   "name": "{{project_name}}",
   "version": "1.0.0",
   "description": "",
   "main": "main.js",
   "scripts": {
      "dev": "ts-node src/main.ts"
   },
   "author": "",
   "license": "ISC",
   "dependencies": {
      "@types/dotenv": "^8.2.0",
      "@types/express": "^4.17.8",
      "@types/mongoose": "^5.7.36",
      "@types/node": "^14.11.2",
      "cors": "^2.8.5",
      "dotenv": "^8.2.0",
      "express": "^4.17.1",
      "mongoose": "^5.10.7",
      "ts-node": "^9.0.0",
      "typescript": "^4.0.3"
   }
}
`

   static tsconfig: string = `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "lib": [
      "es6",
      "es2015",
      "dom"
    ],
    "declaration": true,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "types": [
      "node"
    ],
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
       "@/*": [
          "src/*"
       ]
    }
  }
}
`;

   static routes_api_ts: string = `import express from "express";

let router: express.Router = express.Router();

export default router;
`;

   static utils_error_handeling_ts: string = `export default class ErrorHandeling {

   static Handle(error: any)
   {
      if(error.code === 11000) {
         let errors: Array<CustomError> = new Array<CustomError>();

         for (let key in error.keyValue) {
            errors.push({key, value: error.keyValue[key], type: "duplicate_key"});
         }

         return {
            status: "Error",
            type: "Duplicate Key",
            code: error.code,
            errors
         };
      }

      return false;
   }
}

export class CustomError {
   key: string = "";
   value: any;
   type: string = "";
}
`;

   static utils_str_ts: string = `export default class Str {

   static Capitalize(text: string): string {
      return text.substr(0, 1).toUpperCase() + text.slice(1);
   }

}

`;

   static main_ts: string = `import express, { Request, Response } from "express";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(
   <string>process.env.MONGODB_URI,
   { useNewUrlParser: true, useUnifiedTopology: true },
   (err: any) => {
      if(err) {
         process.exit(1);
      }
   }
);

const app: express.Application = express();

app.use(express.json());
app.use(
   express.urlencoded({
      extended: true
   })
);

import API from "@/Routes/API";

app.use("/api", API);

app.listen(process.env.PORT, () => console.log(\`Server running on port \$\{process.env.PORT\}\`));`;

   static dotenv: string = `PORT=5000
MONGODB_URI=mongodb://localhost:27017`;

   static gitignore: string = `.env
node_modules
dist
package-lock.json
`;

   static middleware: string = `import express, {Request, Response, NextFunction} from 'express';

export default async function(req: Request, res: Response, next: NextFunction) {
   next();
}`;

   static util_class: string = `export default class {{util_name}} {

}
`;

}
