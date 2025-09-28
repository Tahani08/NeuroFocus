// src/components/SettingsModal.jsx
import React, { useState } from "react";
import "./SettingsModal.css";

function SettingsModal({ onClose, setPomodoro, setShortBreak, setLongBreak }) {
  const [pom, setPom] = useState(25);
  const [short, setShort] = useState(5);
  const [long, setLong] = useState(15);

  const handleSave = () => {
    setPomodoro(pom * 60);
    setShortBreak(short * 60);
    setLongBreak(long * 60);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>⏱ Timer Settings</h3>

        <label>Pomodoro (min):</label>
        <input
          type="number"
          value={pom}
          onChange={(e) => setPom(Number(e.target.value))}
        />

        <label>Short Break (min):</label>
        <input
          type="number"
          value={short}
          onChange={(e) => setShort(Number(e.target.value))}
        />

        <label>Long Break (min):</label>
        <input
          type="number"
          value={long}
          onChange={(e) => setLong(Number(e.target.value))}
        />

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal; // ✅ THIS LINE FIXES YOUR ERROR
