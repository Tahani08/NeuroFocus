import React, { useState, useRef } from "react";
import PomodoroTimer from "./PomodoroTimer.jsx";
import ToDoList from "./components/ToDoList";
import SettingsModal from "./components/SettingsModal";
import AestheticPicker from "./components/AestheticPicker";
import GoogleLoginBox from './GoogleLoginBox'; 
import "./App.css";


function App() {
  const [selectedAesthetic, setSelectedAesthetic] = useState("cabin");
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(15 * 60);
  const [showSettings, setShowSettings] = useState(false);

  const [isMuted, setIsMuted] = useState(false); // ⬅️ Sound toggle
  const audioRef = useRef(null); // ⬅️ Reference to the <audio> tag

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  return (
    <div className={`app ${selectedAesthetic}`} style={{ position: "relative" }}>
      {/* === Top Left: Google Calendar Connect Button === */}
      <div className="google-calendar-connect">
        📅 Connect your Google Calendar
      </div>

      {/* === Settings Modal === */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          setPomodoro={setPomodoroTime}
          setShortBreak={setShortBreakTime}
          setLongBreak={setLongBreakTime}
        />
      )}

      {/* === Pomodoro Center === */}
      <div className="pomodoro-wrapper">
        <PomodoroTimer
          pomodoroTime={pomodoroTime}
          shortBreakTime={shortBreakTime}
          longBreakTime={longBreakTime}
          onOpenSettings={() => setShowSettings(true)}
        />
      </div>

      {/* === To-Do List Top Right === */}
      <div className="right-top">
        <ToDoList />
      </div>

      {/* === Notes Bottom Right === */}
      <div className="right-bottom">
        <div className="card notes-box">
          <h4>Notes</h4>
          <textarea placeholder="Write your notes here..." />
        </div>
      </div>

      {/* === Bottom Left: Aesthetic Picker + Google Login === */}
      <div className="bottom-left">
        <AestheticPicker setSelectedAesthetic={setSelectedAesthetic} />
      </div>

      <div className="google-calendar-connect">
        <GoogleLoginBox />
      </div>

      {/* 🔈 Cabin Theme Soundscape & Button */}
      {["cabin", "snow", "meadow", "stars", "ocean", "island"].includes(selectedAesthetic) && (
  <>
    <audio
      ref={audioRef}
      src={`/sounds/${
        selectedAesthetic === "cabin" ? "bonfire.mp3" :
        selectedAesthetic === "snow" ? "snow.mp3" :
        selectedAesthetic === "meadow" ? "meadow.mp3" :
        selectedAesthetic === "stars" ? "stars.mp3" :
        (selectedAesthetic === "ocean" || selectedAesthetic === "island") ? "waves.mp3" :
        ""
      }`}
      autoPlay
      loop
      muted={isMuted}
    />
    <button
      onClick={toggleMute}
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }}
    >
      {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
    </button>
  </>
)}

    </div>
  );
}

export default App;