import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from './pages/Home';
// import Game from './game/Game';
import Register from './pages/Register';

import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import Game from './pages/Game';

function App() {
    return (
        <>
            <NavBar />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/play" element={<Game />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Register isLogin={true} />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
