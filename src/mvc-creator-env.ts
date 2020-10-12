import commander from "commander";
import {Dotenv} from "./Dotenv";

commander.program
   .command("key generate")
   .alias("kg")
   .description("Generate new App key")
   .action(() => Dotenv.GenerateValue("APP_KEY"));

commander.program
   .command("key view")
   .alias("kv")
   .description("View current App key")
   .action(Dotenv.ViewKey);

commander.program
   .command("set <key> <value>")
   .alias("skv")
   .description("Add a key-value to dotenv")
   .action(Dotenv.SetValue);

commander.program
   .command("get <key>")
   .alias("gv")
   .description("Get a value from dotenv")
   .action(Dotenv.GetValue);

commander.program
   .command("remove <key>")
   .alias("rm")
   .description("Remove a key-value pair")
   .action(Dotenv.RemoveKey);

commander.program
   .command("show")
   .description("Show entire .env file")
   .action(Dotenv.Show);

commander.program
   .command("generate <key>")
   .alias("gen")
   .description("Generate value for a given key")
   .action(Dotenv.GenerateValue);

commander.program.parse(process.argv);
