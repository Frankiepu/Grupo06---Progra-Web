// src/App.jsx
import React from 'react';
import HomePageLayout from './components/HomePageLayout';
// No es necesario importar index.css aquí si ya está en main.jsx

function App() {
  return (
    <div className="App">
      <HomePageLayout />
    </div>
  );
}

export default App;