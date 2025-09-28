import { useState, useEffect } from 'react';

const PomodoroTimer = ({ pomodoroTime, shortBreakTime, longBreakTime, onOpenSettings }) => {
  const [secondsLeft, setSecondsLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Pomodoro");
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (mode === "Pomodoro") setSecondsLeft(pomodoroTime);
    else if (mode === "Short Break") setSecondsLeft(shortBreakTime);
    else if (mode === "Long Break") setSecondsLeft(longBreakTime);
  }, [pomodoroTime, shortBreakTime, longBreakTime, mode]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const formatted = formatTime(secondsLeft);
    document.title = isRunning ? `${formatted} - Time to focus!` : `⏱ ${mode}`;
  }, [secondsLeft, isRunning, mode]);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      new Audio("/alarm.mp3").play();

      if (mode === "Pomodoro") {
        setCompleted((prev) => prev + 1);
        setMode("Short Break");
        setSecondsLeft(shortBreakTime);
      } else {
        setMode("Pomodoro");
        setSecondsLeft(pomodoroTime);
      }
    }
  }, [secondsLeft, isRunning, mode, pomodoroTime, shortBreakTime]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
  };

  return (
    <div className="pomodoro-timer-box" style={{ position: 'relative' }}>
      {/* ✅ Top-right settings icon */}
      <button
        className="settings-button settings-top-right"
        onClick={() => {
          console.log("Settings button clicked ✅");
          onOpenSettings(); // open modal
        }}
      >
        ⚙️
      </button>

      <h2>⏱ {mode}</h2>
      <div className="timer-display">{formatTime(secondsLeft)}</div>

      <div className="pomodoro-buttons">
        <button onClick={() => handleModeChange("Pomodoro")}>Pomodoro</button>
        <button onClick={() => handleModeChange("Short Break")}>Short Break</button>
        <button onClick={() => handleModeChange("Long Break")}>Long Break</button>
      </div>

      <button className="start-button" onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Stop" : "Start"}
      </button>

      <p style={{ marginTop: "1rem", color: "white" }}>
        ✅ Completed Pomodoros: {completed}
      </p>
    </div>
  );
};

export default PomodoroTimer;
