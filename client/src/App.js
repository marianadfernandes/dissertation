import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from "./components/home";
import Tabela from "./components/tabela";
import Search from "./components/search"
import HomePage from "./components/homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/tabela" element={<Tabela />} />
          <Route exact path="/pesquisa" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
