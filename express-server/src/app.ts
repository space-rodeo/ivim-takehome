import express from 'express';
import bodyParser from 'body-parser';
import seedData, { NoteInterface } from './seed';
import { v6 as uuid } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    next();
});
const inMemoryData = seedData;

app.get('/notes', (request, response) => {
    const notes: Array<NoteInterface> = [];
    Object.keys(inMemoryData.notes).forEach((key) => {
        notes.push(inMemoryData.notes[key]);
    });
    response.json(notes);
});

app.get('/notes/:id', (request, response) => {
    const id = request.params.id;
    if (inMemoryData.notes[id]) {
        response.json(inMemoryData.notes[id]);
    }
    else {
        response.status(404).send();
    }
});

app.post('/notes', (request, response) => {
    const note: {title: string, content: string} = request.body;
    const currentTime = new Date().toString();
    if (note.content === undefined || note.title === undefined) {
        response.status(500).send('Could not create new note due to missing title or content');
    }
    const id = uuid();
    const fullNote: NoteInterface = {
        ...note,
        id,
        createdAt: currentTime,
        updatedAt: currentTime,
    };
    inMemoryData.notes[id] = fullNote;
    response.status(201).send({ id });
});

app.put('/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = inMemoryData.notes[id];
    const body: {title: string, content: string} = request.body;
    if (note) {
        const currentTime = new Date().toString();
        if (body.content === undefined || body.title === undefined) {
            response.status(400).send('Could not update note with id: ' + id);
        }
        note.title = body.title;
        note.content = body.content;
        note.updatedAt = currentTime;
        inMemoryData.notes[id] = note;
        response.status(202).json(note);
    } else {
        response.status(404).send();
    }
});

app.delete('/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = inMemoryData.notes[id];
    if (note) {
        delete inMemoryData.notes[id];
        response.status(200).send();
    } else {
        response.status(404).send();
    }
});

export default app;
