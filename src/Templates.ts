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

   }

   static async Update(req: Request, res: Response)
   {

   }

   static async Destroy(req: Request, res: Response)
   {

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

let router = express.Router();
`;

   static routesTemplate: string = `import {{route_name}} from './{{route_type}}/{{route_name}}';
router.use("/{{route_path}}", {{route_name}});
`;

   static routesFooter: string = `
export default router;
`;

   static modelRoute: string = `import express from "express";

import {{controller_name}} from "../../Controllers/{{controller_name}}";

let router = express.Router();

router.get("/", {{controller_name}}.Index);
router.post("/", {{controller_name}}.Store);

router.get("/:id", {{controller_name}}.Show);
router.get("/:id", {{controller_name}}.Update);
router.get("/:id", {{controller_name}}.Update);
router.get("/:id", {{controller_name}}.Destroy);

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
}
