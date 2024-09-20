import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditNote.css'

function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === '' || content === '') {
            setErrorMessage('All fields must be completed before submission');
            return;
        }
        axios.post('http://localhost:8080/notes', {
            title,
            content
        }).then(() => {
            navigate('/');
        }).catch((error) => {
            setErrorMessage(error.message);
        });
    }

    return (
        <div className="create-note">
            <form onSubmit={handleSubmit}>
                <span className="error">{errorMessage}</span>
                <label htmlFor="noteTitle">Title: 
                    <input type="text" name="noteTitle" onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label htmlFor="noteContent">Content:
                    <input type="text" name="noteContent" onChange={(e) => setContent(e.target.value)} />
                </label>
                <button type="submit">Create New Note</button>
            </form>
        </div>
    );
}

export default CreateNote;
