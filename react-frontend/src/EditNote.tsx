import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EditNote.css';

function EditNote() {
    const { noteId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/notes/' + noteId).then((response) => {
            setTitle(response.data.title);
            setContent(response.data.content);
        });
    }, [noteId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === '' || content === '') {
            setErrorMessage('All fields must be completed before submission');
            return;
        }
        axios.put('http://localhost:8080/notes/' + noteId, {
            title,
            content
        }).then(() => {
            navigate('/notes/' + noteId);
        }).catch((error) => {
            setErrorMessage(error.message);
        });
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <span className="error">{errorMessage}</span>
                <label htmlFor="noteTitle">Title: 
                    <input type="text" name="noteTitle" onChange={(e) => setTitle(e.target.value)} value={title} />
                </label>
                <label htmlFor="noteContent">Content:
                    <input type="text" name="noteContent" onChange={(e) => setContent(e.target.value)} value={content}/>
                </label>
                <button type="submit">Edit Note</button>
            </form>
        </div>
    )
}

export default EditNote;
