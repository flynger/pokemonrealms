// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Game from "./game/game";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
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
