import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Tabela from "./components/tabela";
import HomePage from "./components/homepage";
import Avaliacao from "./components/avaliacao";
import Utente from "./components/MenBody";
// import Medicamentos from './components/medicamentos';
import PesquisaMedicamentos from "./components/pesquisar-medicamentos";
import SeleçaoDoenças from "./components/seleçao-doenças";

export const uri = "http://localhost:3001"
// const uri = "http://54.38.159.80/aprioriapp" // server

function App() {
  return (
    <div className="App">
      <Router basename="/apriori">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          {/* <Route exact path="/tabela" element={<Tabela />} /> */}
          <Route exact path="/avaliacao" element={<Avaliacao />} />
          <Route exact path="/utente" element={<Utente />} />
          <Route exact path="/medicamentos/pesquisa" element={<PesquisaMedicamentos />} />
          <Route exact path="/medicamentos/doenças" element={<SeleçaoDoenças />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
