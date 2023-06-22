// Import dependencies
import React, { useState } from 'react';

// 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components and pages
import LogPage from './pages/LogPage.js';
import CreatePage from './pages/CreatePage.js';
import EditPage from './pages/EditPage.js';


// Import styles and images
import './App.css';

function App() {
  const [game, setGame] = useState([])
  return (
    <>
    <BrowserRouter>
      <header>
        {/* < img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Video Game Log</h1>
      </header>

      <main>
        <section>
          <Routes>
            <Route path="/" element={<LogPage setGame={setGame} />} />
            <Route path="/add-game" element={<CreatePage />} />
            <Route path="/edit-game" element={<EditPage game={game} />} />
          </Routes>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Jonathan Hirsch</p>
      </footer>

      </BrowserRouter>
      </>
  );
}

export default App;
