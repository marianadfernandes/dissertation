import { React, useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

function toggleSubItems(e) {
    const subItems = e.target.nextElementSibling;
  
    if (subItems) {
        if (subItems.classList.contains('show')) {
            subItems.classList.remove('show');
        } else {
            subItems.classList.add('show');
        }
    }
}

document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dropbtn')) {
        // Se o clique não foi em um dropbtn, oculte todos os subitens
        const allSubItems = document.querySelectorAll('.dropdown-content');
        allSubItems.forEach(subItems => {
            subItems.classList.remove('show');
        });
    } else {
        // Se o clique foi em um dropbtn, mostre ou oculte os subitens correspondentes
        toggleSubItems(e);
    }
});

  function renderTabela(tabela, level) {
    const handleResultClick = (e, result) => {
        console.log('Resultado clicado:', result);
    };

    return (
        <div className={`dropdown-levels dropdown-level-${level}`} onClick={(e) => handleResultClick(e, tabela)}>
            <div className={`dropdown`}>
                <button className="dropbtn">
                    {tabela['id']}  {tabela['desc']}
                </button>
                <div className={`dropdown-content submenu`}>
                    {tabela['nota'] ? <a>Nota: {tabela['nota']}</a> : null}
                    {tabela['valor'] ? <a>Valor: {tabela['valor']}</a> : null}
                    {tabela['refs'] ? <a>Referência a: {tabela['refs']}</a> : null}
                    {tabela.sub ? (tabela.sub.map((subData) => (
                        <a key={subData.id}>{renderTabela(subData, level + 1)}</a>
                    ))) : null}
                </div>
            </div>
        </div>
    );
}


function Avaliacao () {

    const baseURL = "http://localhost:3001/tabela/search";


    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);


    const handleSearchChange = async (e) => {

        const searchText = e.target.value;
        setSearchText(searchText);

        try {
            if (searchText) {
                axios.get(`${baseURL}/${searchText}`).then((response) => {
                console.log(JSON.stringify(response.data));
                setSearchResults(response.data);
                });
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <Header />

            <div className="search-bar">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-light bg-light">
                            <form className="form-inline">
                                <input className="form-control mr-lg-2" 
                                        type="search" 
                                        placeholder="Pesquisa..." 
                                        aria-label="Search" 
                                        value={searchText} 
                                        onChange={handleSearchChange} />
                                <button className="btn-2" type="submit">Search</button>
                            </form>
                        </nav>  
                    </div>
                </div>
            </div>

            <div id="searchResults" className="results">
                <div className="container">
                    <div className="row">
                        {!searchResults ? (
                            <p>Dados ainda estão sendo carregados...</p>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((item, index) => (
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
            </div>
            
           

            <Footer /> 
        </div>   
    )
}

export default Avaliacao;