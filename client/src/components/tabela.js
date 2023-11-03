import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function renderTabelaRecursive(tabela) {
  return (
    <div>
      {tabela && Object.keys(tabela).map((key) => (
          <div key={key}>
            <h6>{tabela[key]['id']} {tabela[key]['desc']}</h6>
            {tabela[key]['nota'] ? (
              <p>Nota: {tabela[key]['nota']}</p>
            ) : (
              <></>
            )
            }
            {tabela[key]['valor'] ? (
              <p>Valor: {tabela[key]['valor']}</p>
            ) : (
              <></>
            )
            }
            {tabela[key]['refs'] ? (
              <p>Referência a: {tabela[key]['refs']}</p>
            ) : (
              <></>
            )
            }
            <div>
              {renderTabelaRecursive(tabela[key]['sub'])}
            </div>
          </div>
      ))}
      </div>
  );
}

function renderTabela(tabela) {
    if (!tabela || !tabela[0] || !tabela[0].Tabela) {
      return <p>Dados ainda estão sendo carregados...</p>;
    }
  
    return (
      <div>
        {Object.keys(tabela[0].Tabela).map((key) => (
          <div key={key}>
                <h3>Capítulo {tabela[0].Tabela[key]['id']}: {tabela[0].Tabela[key]['desc']}</h3>
                <hr></hr>
                <div>
                  {renderTabelaRecursive(tabela[0].Tabela[key]['sub'])}
                </div>
              <hr></hr>
            </div>
          ))}
        </div>
);
  }

function Tabela() {

  const baseURL = "http://localhost:3001/tabela/listTabela";

  const [tabela, setTabela] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      console.log(JSON.stringify(response.data));
      setTabela(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  fetchData();
}, []);

//   console.log(tabela[0].Tabela)

 
  return (
    <div>{renderTabela(tabela)}</div>
  );
}

export default Tabela;
