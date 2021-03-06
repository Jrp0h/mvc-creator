#!/usr/bin/env node

import commander from "commander";

commander.program
   .version("0.0.1")
   .command("create", "Create new Projects, Controllers or Models")
   .command("env", "Manage .env variables")
   .parse(process.argv);
