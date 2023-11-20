import React, { useEffect, useState } from 'react';
import axios from 'axios';

function toggleSubItems(e) {
    const subItems = e.target.nextElementSibling;
    const parentDropdown = e.target.parentElement;
  
    if (subItems) {
      if (subItems.classList.contains('show')) {
        subItems.classList.remove('show');
        parentDropdown.style.height = 'auto'; 
      } else {
        subItems.classList.add('show');
        parentDropdown.style.height = parentDropdown.style.height + subItems.style.height + 'px';
      }
    }
  }
  
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dropbtn')) {
      toggleSubItems(e);
    }
  });

function renderTabela(tabela, level) {
    return (
      <div className={`dropdown-levels dropdown-level-${level}`}>
          <div className={`dropdown`}>
            <button className="dropbtn">
              {tabela['id']}  {tabela['desc']}
            </button>
            <div className={`dropdown-content submenu`}>
              {tabela['nota'] ? <a>Nota: {tabela['nota']}</a> : null}
              {tabela['valor'] ? <a>Valor: {tabela['valor']}</a> : null}
              {tabela['refs'] ? <a>Referência a: {tabela['refs']}</a> : null}
              {tabela.sub ? (tabela.sub.map((subData) => (
                <a key={subData.id}>{renderTabela(subData, level + 1)}</a>))) : null}
            </div>
          </div>
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearchClick(); // Chama a função de pesquisa quando a tecla "Enter" for pressionada
      }
    };

    // Adicione o event listener quando o componente for montado
    document.addEventListener('keydown', handleKeyPress);

    // Remova o event listener quando o componente for desmontado
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetId, handleSearchClick]);

  console.log("ENTRY", entry);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisa"
          aria-label="Pesquisa"
          aria-describedby="addon-wrapping"
          value={targetId}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSearchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#525256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 20.9999L16.65 16.6499" stroke="#525256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
      </div>
      <div className="result-container">
        {!entry ? (
                <p>Dados ainda estão sendo carregados...</p>
            ) : entry.length > 0 ? (
                entry.map((item, index) => (
                <div key={index}>
                    {renderTabela(item, 1)}
                    <hr />
                </div>
                ))
            ) : (
                <p>Não encontrado na tabela.</p>
            )}
      </div>
    </div>
  );
}



export default Search;
