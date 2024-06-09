// const getNotes = function () {
//   return "Your notes...";
// };

// module.exports = getNotes;

const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// // Customize yargs version
// yargs.version("1.1.0");

// // Create add command
// yargs.command({
//   command: "add",
//   describe: "Add a new note",
//   builder: {
//     title: {
//       describe: "Note title",
//       demandOption: true,
//       type: "string",
//     },
//     body: {
//       describe: "Note body",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler(argv) {
//     notes.addNote(argv.title, argv.body);
//   },
// });

// // Create remove command
// yargs.command({
//   command: "remove",
//   describe: "Remove a note",
//   builder: {
//     title: {
//       describe: "Note title",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler(argv) {
//     notes.removeNote(argv.title);
//   },
// });

// // Create list command
// yargs.command({
//   command: "list",
//   describe: "List your notes",
//   handler() {
//     notes.listNotes();
//   },
// });

// // Create read command
// yargs.command({
//   command: "read",
//   describe: "Read a note",
//   builder: {
//     title: {
//       describe: "Note title",
//       demandOption: true,
//       type: "string",
//     },
//   },
const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};
//
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));
  //for each note print out the note and the title
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  //loadNotes is a function that reads a json file
  const notes = loadNotes();
  //arrow function validates if the titles match then run code
  const note = notes.find((note) => note.title === title);

  //if true reverse the note and chalk
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
    //if first condition not met then return the string below
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
//reading the notes.json file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    //after reading the file  the toString method returns the json as string
    const dataJSON = dataBuffer.toString();
    //return the data being parsed as number
    return JSON.parse(dataJSON);
    //return the array if error
  } catch (e) {
    return [];
  }
};
//this is exporting the functions to be used in other files
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
//   handler(argv) {
//     notes.readNote(argv.title);
//   },
// });

// yargs.parse();
