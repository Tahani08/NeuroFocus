import React, { useState } from "react";
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

return (
  <div className={`app ${selectedAesthetic}`} style={{ position: "relative" }}>
    {/* === Top Left: Google Calendar Connect Button === */}
    <div className="google-calendar-connect">
      📅 Connect your Google Calendar
    </div>

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
        longBreakTime={setLongBreakTime}
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

  </div>
);
 
} 

export default App;

