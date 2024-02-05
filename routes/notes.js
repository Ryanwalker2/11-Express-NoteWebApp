const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//GET Route for retrieving notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add new note.`);
    console.info(`${req.body} request body`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully`);
    } else {
        res.json('Error in adding note');
    }
});

notes.get('/:note_id', (req, res) => {
    if(currentNote.note_id) {
        console.info(`${req.method} request recieved to get a single note`);
        const noteId = req.params.note_id;
        for (let i=0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.note_id === noteId) {
                res.json(currentNote);
                return;
            }
        }
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Review ID not provided');
    }
});

module.exports = notes;