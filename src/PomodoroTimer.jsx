import { useState, useEffect } from 'react';

const DEFAULT_POMODORO = 25 * 60;
const DEFAULT_SHORT_BREAK = 5 * 60;
const DEFAULT_LONG_BREAK = 15 * 60;

const PomodoroTimer = ({ pomodoroTime, shortBreakTime, longBreakTime, onOpenSettings }) => {
  const getTimeForMode = (mode) => {
    if (mode === 'Pomodoro') return pomodoroTime || DEFAULT_POMODORO;
    if (mode === 'Short Break') return shortBreakTime || DEFAULT_SHORT_BREAK;
    if (mode === 'Long Break') return longBreakTime || DEFAULT_LONG_BREAK;
    return DEFAULT_POMODORO;
  };

  const [mode, setMode] = useState('Pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(getTimeForMode('Pomodoro'));
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(0);

  // ⏱ Start ticking
  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // ⏰ Handle timer reaching 0
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      new Audio("/alarm.mp3").play();
      if (mode === "Pomodoro") {
        setCompleted((prev) => prev + 1);
        setMode("Short Break");
        setSecondsLeft(getTimeForMode("Short Break"));
      } else {
        setMode("Pomodoro");
        setSecondsLeft(getTimeForMode("Pomodoro"));
      }
    }
  }, [secondsLeft, isRunning]);

  // 📣 Update title
  useEffect(() => {
    const formatted = formatTime(secondsLeft);
    document.title = isRunning ? `${formatted} - ${mode}` : `⏱ ${mode}`;
  }, [secondsLeft, isRunning, mode]);

  // 🧠 When user clicks a mode button
  const handleModeChange = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(getTimeForMode(newMode));
  };

  const formatTime = (totalSecs) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-timer-box" style={{ position: 'relative' }}>
      <button className="settings-button settings-top-right" onClick={onOpenSettings}>
        ⚙️
      </button>

      <h2>⏱ {mode}</h2>
      <div className="timer-display">{formatTime(secondsLeft)}</div>

      <div className="pomodoro-buttons">
        <button onClick={() => handleModeChange("Pomodoro")}>Pomodoro</button>
        <button onClick={() => handleModeChange("Short Break")}>Short Break</button>
        <button onClick={() => handleModeChange("Long Break")}>Long Break</button>
      </div>

      <button className="start-button" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>

      <p style={{ marginTop: "1rem", color: "white" }}>
        ✅ Completed Pomodoros: {completed}
      </p>
    </div>
  );
};

export default PomodoroTimer;
