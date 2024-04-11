import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Tabela from "./components/tabela";
import HomePage from "./components/homepage";
import Avaliacao from "./components/avaliacao";
import Utente from "./components/utente";


function App() {
  return (
    <div className="App">
      <Router basename="/apriori">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/tabela" element={<Tabela />} />
          <Route exact path="/avaliacao" element={<Avaliacao />} />
          <Route exact path="/utente" element={<Utente />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
