import { React, useState, useEffect } from "react";
import axios from "axios";

function toggleSubItems(e) {
  const subItems = e.target.nextElementSibling;
  const parentDropdown = e.target.parentElement;

  console.log('Current subItems height:', subItems.offsetHeight);

  if (subItems) {
    if (subItems.offsetHeight !== 0) {
      console.log('Entering show condition');
      subItems.classList.add('show');

      const subItemsHeight = subItems.offsetHeight;
      parentDropdown.style.height = `${parentDropdown.offsetHeight + subItemsHeight + 20}px`;

      const allParents = getAllParents(parentDropdown, 'dropdown');
      console.log('parents', allParents);

      allParents.forEach((parent) => {
        parent.style.height = `${parent.offsetHeight + subItemsHeight + 20}px`;
      });
    } else {
      console.log('Entering hide condition');
      subItems.classList.remove('show');
      parentDropdown.style.height = 'auto';

      // restaurar a altura dos filhos
      Array.from(parentDropdown.children).forEach((child) => {
        child.style.height = 'auto';
      });

      const allParents = getAllParents(parentDropdown, 'dropdown');
      console.log('parents', allParents);

      // restaura a altura dos pais
      allParents.forEach((parent) => {
        const childrenHeight = Array.from(parent.children)
          .reduce((acc, child) => acc + child.offsetHeight, 0);
        parent.style.height = `${childrenHeight + 20}px`;
      });
    }
  }
}

// procura os elementos pai 
function getAllParents(element, targetClass) {
  const parents = [];
  let currentElement = element.parentElement;

  while (currentElement) {
    if (currentElement.classList.contains(targetClass)) {
      parents.push(currentElement);
    }
    currentElement = currentElement.parentElement;
  }

  return parents;
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('dropbtn')) {
    toggleSubItems(e);
  }
});;

function renderTabelaSearch(tabela, level) {
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
  
  
  function renderTabela(tabela, level) {
    return (
      <div className={`dropdown-levels dropdown-level-${level}`}>
        {Object.keys(tabela).map((key) => (
          <div className={`dropdown`}>
            <button className="dropbtn">
              {tabela[key]['id']} {tabela[key]['desc']}
            </button>
            <div className={`dropdown-content submenu`}>
              {tabela[key]['nota'] ? <a>Nota: {tabela[key]['nota']}</a> : null}
              {tabela[key]['valor'] ? <a>Valor: {tabela[key]['valor']}</a> : null}
              {tabela[key]['refs'] ? <a>Referência a: {tabela[key]['refs']}</a> : null}
              {tabela[key]['sub'] ? (
                <a>{renderTabela(tabela[key]['sub'], level + 1)}</a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function HomePage() {
    const baseURL = "http://localhost:3001/tabela/listTabela";
    const searchURL = "http://localhost:3001/tabela/search";
  
    const [tabela, setTabela] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const level = 1;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseURL);
          console.log(JSON.stringify(response.data));
          setTabela(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const handleInputChange = (event) => {
      setSearchInput(event.target.value);
    };
  
    const handleSearchClick = () => {
      if (searchInput) {
        axios.get(`${searchURL}/${searchInput}`).then((response) => {
          console.log(JSON.stringify(response.data));
          setSearchResults(response.data);
        });
      }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSearchClick();
        }
      };
  
    return (
      <div>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <span>Avaliação do Dano Corporal</span>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              <button type="button" onClick={handleSearchClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#525256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 20.9999L16.65 16.6499" stroke="#525256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </nav>
  
        <div className="result-container">
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div key={index}>
                {renderTabelaSearch(item, 1)}
                <hr />
              </div>
            ))
          ) : (
            <div className="tabela-container">
              {tabela ? (
                renderTabela(tabela, level)
              ) : (
                <p>Dados ainda estão sendo carregados...</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

export default HomePage;