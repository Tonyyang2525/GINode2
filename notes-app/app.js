// //fs.writeFileSync(file,data[.options]) ->> takes 2 arguments, name of file you want to write to and the data you want to write

// //require function is how we load things in such as npms, another file we created, or core node module.
// const fs = require("fs");

// //fs.writeFile  ->> method to write data to a file from the file system from the json file.

// fs.writeFileSync("notes.txt", "My name is Tony.");

// fs.appendFileSync("notes.txt", " I live in NC");

// const add = require("./utils");

// const sum = add(4, -2);

// console.log(sum);

//validator is a way to validate conditions without hard code
// it is a package you download
// const validator = require("validator");
// const getNotes = require("./notes.js");

// const msg = getNotes();
// // //returns true
// // console.log(validator.isEmail("andrew@exmaple.com"));
// // //returns false
// // console.log(validator.isEmail("@exmaple.com"));

// //similar test to the above
// console.log(validator.isURL("https://mead.io"));

// console.log(msg);

//New challenge
// const chalk = require("chalk");
// const yargs = require("yargs");
// const getNotes = require("./notes.js");

// const msg = getNotes();
// console.log(msg);

// const greenMsg = chalk.blue.inverse.bold("Success");
// console.log(greenMsg);

// //start of section 4
// console.log(process.argv);

//new section
// const chalk = require("chalk");
// const yargs = require("yargs");
// const getNotes = require("./notes.js");

// const command = process.argv[2];

// console.log(process.argv);

// if (command === "add") {
//   console.log("Adding note!");
// } else if (command === "remove") {
//   console.log("removing note!");
// }

//This is the Note App Section
//new section
const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes.js");
const { title } = require("process");

//Customize  yargs verison
yargs.version("1.1.0");

//Add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "String",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title: " + argv.title);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    //remove is a function defined in notes.js
    //this is usable due to the files being exported
    notes.removeNote(argv.title);
  },
});
// Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  //handler is a npm package we download to handle things.
  //when requests comes in the handler decides how to respond
  handler(argv) {
    notes.readNote(argv.title);
  },
});

//this goes through the functions and parses them
yargs.parse();

//this is needed for the program to work or else nothing is never used
console.log(yargs.argv);
