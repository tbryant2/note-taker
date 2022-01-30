const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
// module.exports = function(application) {
// Routes
// application.get("/notes", function (req, res) {
//   res.sendFile(path.join((__dirname, "/public"), "/notes.html"));
// });

// Display notes
router.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) {
      console.log("poop");
      return;
    }
    const notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
  });
});


// Create new note
router.post("/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) {
      console.log("poop");
      return;
    }
    const notes = JSON.parse(data);
    console.log(notes);
    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let id = randLetter + Date.now();
    let newNote = {
      id: id,
      title: req.body.title,
      text: req.body.text,
    };
    console.log(typeof notes);
    notes.push(newNote);
    const stringifyNote = JSON.stringify(notes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Note successfully saved to db.json");
        res.json(newNote);
      }
    });
  });
});

// Delete note
router.delete("/notes/:id", function (req, res) {
  let noteID = req.params.id;
  fs.readFile("db/db.json", "utf8", function (err, data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      console.log("note.id", note.id);
      console.log("noteID", noteID);
      return note.id !== noteID;
    });
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Note deleted");
      }
    });
    res.json({ok: true});
  });
});

module.exports = router
