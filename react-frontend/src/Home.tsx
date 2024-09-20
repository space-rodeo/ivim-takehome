import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NoteInterface } from "./types";
import './Note.css'

function Home() {
    const [notes, setNotes] = useState<Array<NoteInterface>>([]);

    useEffect(() => {
      axios.get('http://localhost:8080/notes').then((response) => {
        setNotes(response.data);
      });
    }, []);
  
    const notesDisplay = notes.map((note) => {
      return (
        <div className="note" key={note.id}>
            <div><Link to={`/notes/${note.id}`}>{note.title}</Link></div>
            <div>{note.content}</div>
        </div>
      );
    });

    return (
        <div className="notesContainer">
            {notesDisplay}
            <Link to={'notes/create'}>Create New Note</Link>
        </div>
    );
}

export default Home;
