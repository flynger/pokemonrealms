import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./Navbar";
import Game from "./game/game";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Game />
    </div>
  );
}

export default App;
