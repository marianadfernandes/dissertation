import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import Tabela from "./components/tabela";
import HomePage from "./components/homepage";
import Avaliacao from "./components/avaliacao";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/tabela" element={<Tabela />} />
          <Route exact path="/avaliacao" element={<Avaliacao />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
