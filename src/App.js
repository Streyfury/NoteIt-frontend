import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes from backend
  const fetchNotes = () => {
    axios.get("https://noteitdep.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create a new note
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://noteitdep.onrender.com/api/notes", {
      title,
      content
    })
    .then((res) => {
      setTitle("");
      setContent("");
      fetchNotes(); // Refresh note list
    })
    .catch((err) => {
      console.error("Error creating note:", err);
    });
  };

  // DELETE note
  const deleteNote = (id) => {
    axios.delete(`https://noteitdep.onrender.com/api/notes/${id}`)
      .then(() => {
        fetchNotes(); // Refresh after deletion
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  };

  // ⬇️ Return JSX starts here — INSIDE the App function
  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add Note
        </button>
      </form>

      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}

export default App;
