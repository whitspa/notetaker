const notes = require('express').Router();
let db = require("../../db/db.json")
const fs = require("fs")

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  db= JSON.parse(fs.readFileSync('./db/db.json')) || [];
  res.json(db)
});

// GET Route for a specific note
notes.get('/api/notes/:id', (req, res) => {
  let specificNote = db.filter(element => element.id == req.params.id)
  res.json(specificNote)
});

// DELETE Route for a specific note
notes.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  let updateList = db.filter(element => element.id != noteId)
  db = updateList
  fs.writeFileSync("./db/db.json",JSON.stringify(db),function(err,data){
    if(err)throw err;
  })

  res.json(db);
 
});


// POST Route for a new note
notes.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
    title,
    text,
    id: Math.floor(Math.random()*10089),
    };
    db.push(newNote)
    fs.writeFileSync("./db/db.json",JSON.stringify(db),function(err,data){
      if(err)throw err;
    })

    res.json(db);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;