// src/components/NoteList.js
import React from "react";

const NoteList = ({ notes, deleteNote }) => {
  if (!notes.length) return <p>No notes available.</p>;

  return (
    <>
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button
            onClick={() => deleteNote(note._id)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default NoteList;
