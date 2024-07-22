import './App.css';
import NavBar from './components/Navbar';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Game from './game/Game';
import Register from './pages/Register';

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
  );
}

export default App;
