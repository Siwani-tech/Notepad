import { useEffect, useState } from "react";
import "./style/notepadForm.css";
import DeleteNote from "./DeleteNote";

export default function NotepadForm() {
  const initialUserNote = {
    note: "",
    notesList: [],
  };

  const [usernote, setusernote] = useState(initialUserNote);

  function handleChange(event) {
    const { name, value } = event.target;

    setusernote((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddNote() {
    if (usernote.note.trim() !== "") {
      const newNotes = {
        id: Date.now(),
        content: usernote.note,
      };

      setusernote((prev) => ({
        ...prev,
        notesList: [...prev.notesList, newNotes],
        note: "" 
      }));
    }
  }

  function deleteNote(id) {
    const updatedNotesList = usernote.notesList.filter((note) => note.id !== id);

    setusernote((prev) => ({
      ...prev,
      notesList: updatedNotesList,
    }));
  }

  useEffect(() => {
   
    try {
      const savedNotes = JSON.parse(localStorage.getItem("usernote"));
      if (savedNotes) {
        setusernote(savedNotes);
      }
    } catch (error) {
      console.error("Error parsing local storage data:", error);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("usernote", JSON.stringify(usernote));
  }, [usernote]);

  return (
    <>
      <div className="container">
        <h2>Notepad  ✏️</h2>
        <div className="form">
          <textarea
            name="note"
            id="note"
            rows="20"
            onChange={handleChange}
            value={usernote.note}
            placeholder="Start typing..."
          ></textarea>

          <button className="addNote" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
        <div className="notes-list">
          
          <ul>
            {usernote.notesList.map((note) => (
              <li key={note.id}>
                {note.content}
                <DeleteNote onDelete={() => deleteNote(note.id)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
