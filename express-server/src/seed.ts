export interface NoteInterface {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export interface NotesInterface {
    notes: {
        [key: string]: NoteInterface;
    };
};

const seedData: NotesInterface = {
    notes: {},
};

export default seedData;
