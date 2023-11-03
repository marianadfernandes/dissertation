import { React, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function renderTabelaRecursive(tabela) {

    if (!tabela) {
        return null;
      }
  
    return (
      <div>
        <h6>{tabela.id} {tabela.desc}</h6>
        {tabela.nota ? <p>Nota: {tabela.nota}</p> : null}
        {tabela.valor ? <p>Valor: {tabela.valor}</p> : null}
        {tabela.refs ? <p>Referência a: {tabela.refs}</p> : null}
        {tabela.sub && tabela.sub.map((subData) => (
        <div key={subData.id}>
          {renderTabelaRecursive(subData)}
        </div>
      ))}

      </div>
    );
  }
  

function Search() {
    const baseURL = "http://localhost:3001/tabela/search"; 

    const [targetId, setTargetId] = useState(""); 
    const [entry, setEntry] = useState([]);

    const handleInputChange = (event) => {
        setTargetId(event.target.value);
    };

    const handleSearchClick = () => {
        if (targetId) {
            axios.get(`${baseURL}/${targetId}`).then((response) => {
                console.log(JSON.stringify(response.data));
                setEntry(response.data);
            });
        }
    };

    console.log("ENTRY", entry);

    return (
        <div>
        <div className="search-bar">
            <input type="text"
                className="form-control"
                placeholder="Pesquisa"
                aria-label="Pesquisa"
                aria-describedby="addon-wrapping"
                value={targetId}
                onChange={handleInputChange}/>
            <button type="submit" onClick={handleSearchClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#525256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 20.9999L16.65 16.6499" stroke="#525256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
        <div className="result-container">
            {entry && entry.length > 0 ? (
                entry.map((item, index) => (
                <div key={index}>
                    {renderTabelaRecursive(item)}
                    <hr></hr>
                </div>
                ))
            ) : "Não encontrado na tabela."}
        </div>
        </div>

        // <div className="search-container">
        //     <div className="input-container">
        //         <input
        //             type="text"
        //             className="form-control"
        //             placeholder="Pesquisa"
        //             aria-label="Pesquisa"
        //             aria-describedby="addon-wrapping"
        //             value={targetId}
        //             onChange={handleInputChange}
        //         />
        //         <button onClick={handleSearchClick}>
        //             Search
        //         </button>
        //     </div>
        //     <div className="result-container">
        //         {entry ? renderTabelaRecursive(entry) : null}
        //     </div>
        // </div>
    );
}

export default Search;
