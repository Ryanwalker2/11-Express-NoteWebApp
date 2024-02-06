const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

//GET Route for retrieving notes
notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for new note
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(newNote);        
    }
});
notes.get('/:id', async (req, res) => {
    if (req.params.id) {
        const existingNotes = JSON.parse(await readFromFile('./db/notes.json'));
        const noteId = req.params.id;
        for (let i = 0; i < existingNotes.length; i++) {
            const currentNote = existingNotes[i];
            if (currentNote.id === noteId) {
                return res.json(currentNote);
            }
        }
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    }
});

notes.delete('/:id', async (req, res) => {
    if (req.params.id) {
        const noteId = req.params.id;
        const existingNotes = JSON.parse(await readFromFile('./db/notes.json'));
        console.log(`existing Notes: ${existingNotes}`);
        for (let i = 0; i < existingNotes.length; i++) {
            const currentNote = existingNotes[i];
            console.log('currentNode: ', currentNote);
            if (currentNote.id == noteId) {
                console.log('OK');
                deleteFromFile(i, './db/notes.json');
                return res.send(`Note successfully removed from list`);
            }
        }
        res.status(404).send('Provided Note ID does not match any existing note');
    } else {
        res.status(400).send('Note ID not provided');
    }
});

module.exports = notes;