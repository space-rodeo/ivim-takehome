import { useEffect, useState } from "react";
import { NoteInterface } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Note() {
    const { noteId } = useParams();
    const [note, setNote] = useState<NoteInterface>();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/notes/' + noteId).then((response) => {
            setNote(response.data);
        }).catch((error) => {
            setErrorMessage(error.message);
        });
    }, [noteId]);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/notes/' + noteId + '/edit');
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.delete('http://localhost:8080/notes/' + noteId).then((response) => {
            navigate('/');
        }).catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <div className="note">
            <span className="error">{errorMessage}</span>
            <div>Title: {note && note.title}</div>
            <div>Content: {note && note.content}</div>
            <div>Created At: {note && note.createdAt}</div>
            <div>Updated At: {note && note.updatedAt}</div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Note;
