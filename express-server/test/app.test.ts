import request from 'supertest';
import app from '../src/app';
import seedData from '../src/seed';

describe('Test empty notes', () => {
    beforeEach(() => {
        seedData.notes = {};
    })

    test('Get empty notes', async () => {
        const response = await request(app).get('/notes');
        expect(response.body).toEqual([]);
    });

    test('Get note by id', async () => {
        const response = await request(app).get('/notes/id2');
        expect(response.statusCode).toEqual(404);
    });

    test('Delete non-existent note', async () => {
        const response = await request(app).delete('/notes/id2');
        expect(response.statusCode).toEqual(404);
    });

    test('Update non-existent note', async () => {
        const put = {
            title: 'title',
            content: 'content',
        };
        const response = await request(app).put('/notes/id2').send(put);
        expect(response.statusCode).toEqual(404);
    });

    test('Post new note', async () => {
        const post = {
            title: 'unique title',
            content: 'unique content',
        };
        const response = await request(app).post('/notes').send(post);
        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeDefined();
        const newResponse = await request(app).get('/notes/' + response.body.id);
        expect(newResponse.body.title).toEqual('unique title');
        expect(newResponse.body.content).toEqual('unique content');
    });
});

describe('Test filled notes', () => {
    const date = new Date().toString();
    const note1 = {
        id: 'id1',
        title: 'title',
        content: 'content',
        createdAt: date,
        updatedAt: date,
    };
    const note2 = {
        id: 'id2',
        title: 'second title',
        content: 'second content',
        createdAt: date,
        updatedAt: date,
    };

    beforeEach(() => {
        seedData.notes = {
            'id1': structuredClone(note1),
            'id2': structuredClone(note2),
        };
    });

    test('Get all notes', async () => {
        const response = await request(app).get('/notes');
        expect(response.body).toEqual([note1, note2]);
    });

    test('Get note by id', async () => {
        const response = await request(app).get('/notes/id2');
        expect(response.body).toEqual(note2);
    });

    test('Put new data in note', async () => {
        const put = {
            title: 'unique title',
            content: 'unique content'
        };
        const response = await request(app).put('/notes/id2').send(put);
        expect(response.statusCode).toEqual(202);
        const newResponse = await request(app).get('/notes/id2');
        expect(newResponse.body).not.toEqual(note2);
        expect(newResponse.body.title).toEqual('unique title');
        expect(newResponse.body.content).toEqual('unique content');
    });

    test('Delete existing note', async () => {
        const response = await request(app).delete('/notes/id2');
        expect(response.statusCode).toEqual(200);
        const newResponse = await request(app).get('/notes');
        expect(newResponse.body).toEqual([note1]);
    });
});
