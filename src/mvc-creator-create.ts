import commander from "commander";

import {Project} from "./Project";
import {Controller} from "./Controller";
import {Model} from "./Model";
import {Middleware} from "./Middleware";
import {Dotenv} from "./Dotenv";
import {Guard} from "./Guard";

commander.program
   .command("project <name>")
   .alias("p")
   .description("Create new Project")
   .action((name, options) => Project.Create(name, options))

commander.program
   .command("controller <name>")
   .alias("c")
   .description("Create new Controller")
   .option("-e, --everything", "Create a Model, Controller and Routes")
   .option("-a, --api", "Only creates API methods. (Excluding Edit and Create)")
   .action(function (name, options) {Controller.Create(name, options)});

commander.program
   .command("model <name>")
   .alias("m")
   .description("Create new Model")
   .action(function (name, options) {Model.Create(name, options)});

commander.program
   .command("middleware <name>")
   .alias("mw")
   .description("Create new Middleware")
   .action(function (name, options) {Middleware.Create(name, options)});

commander.program
   .command("guard <name>")
   .alias("g")
   .description("Create new Guard")
   .action(function (name, options) {Guard.Create(name, options)});

commander.program
   .command("env")
   .description("Create an empty .env file")
   .action(() => Dotenv.Create());

commander.program.parse(process.argv);
