#!/usr/bin/env node

/**
 * CLI Tool for this Package
 */
var program = require("commander");
const { recuint } = require("./index");

program
  .version("0.0.1")
  .option("-m, --manager [type]", "Choose NPM or Yarn")
  .option("-c, --cmd [type]", "The command to pass through to the manager")
  .option(
    "-d, --dir <dir>",
    "The directory to run this too. defaults to this directory"
  )
  .parse(process.argv);

console.log("Installing Dependencies...");

const {
  manager = "yarn",
  cmd: command = "install",
  dir: root = "./"
} = program;

console.log("Using Directory: ", program.dir);
console.log("");

recuint({
  manager,
  command,
  root
})
  .then(Responses => {
    Responses.map(r => {
      console.log(r);
    });
  })
  .catch(e => {
    console.log(e);
  });
