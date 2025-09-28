import React from 'react';
import './AestheticPicker.css';


const aesthetics = [
  // Light & fresh
  'snow', 'meadow',
  // Nature - sea + island
  'ocean', 'island',
  // Vivid & creative
  'stars','cabin', 
  // Urban & vintage
  'sunburst', 'glamour'
];


export default function AestheticPicker({ setSelectedAesthetic }) {
  return (
    <div className="aesthetic-picker">
      <h4>Aesthetic</h4>
      <div className="aesthetic-buttons">
        {aesthetics.map((theme) => (
          <button
            key={theme}
            className={`aesthetic-btn ${theme}`}  // ✅ HERE
            onClick={() => setSelectedAesthetic(theme)}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}
