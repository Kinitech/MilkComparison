import './App.css';
import Milks from "./pages/Milks";
import React from "react";

function App() {

  return (
    <div className="App layer">
        <div className="header">
            <h1>which milk does the most damage?</h1>
        </div>
        <Milks/>
        <div className="footer">
            <h3>Data sourced from Joseph Poore and Thomas Nemecek (2018)</h3>
        </div>
    </div>
  );
}

export default App;
