// src/components/NoteForm.js
import React, { useState } from "react";
import axios from "axios";

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/notes", { title, content });
      setTitle("");
      setContent("");
      onNoteAdded(); // Refresh notes from parent
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  return (
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
  );
};

export default NoteForm;
