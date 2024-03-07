import { React, useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

// function toggleSubItems(e) {
//     const subItems = e.target.nextElementSibling;
//     console.log(subItems);
// }

function renderTabela(tabela, level, toggleDropdown, openSubmenuIds) {
    return (
        <div className={`dropdown-levels dropdown-level-${level}`} key={tabela.id}>
            <div className={`dropdown`}>
                <button onClick={(e) => toggleDropdown(e, tabela, level)} className="dropbtn">
                    {tabela['id']}  {tabela['desc']}
                </button>
                <div className={`dropdown-content submenu ${openSubmenuIds[level] === tabela.id ? 'visible' : 'hidden'}`}>
                    {tabela['nota'] ? <a>Nota: {tabela['nota']}</a> : null}
                    {tabela['valor'] ? <a>Valor: {tabela['valor']}</a> : null}
                    {tabela['refs'] ? <a>Referência a: {tabela['refs']}</a> : null}
                    {tabela.sub ? (tabela.sub.map((subData) => (
                        <a key={subData.id}>
                            {renderTabela(subData, level + 1, toggleDropdown, openSubmenuIds)}
                        </a>
                    ))) : null}
                </div>
            </div>
        </div>
    );
}

function Avaliacao () {

    const baseURL = "http://localhost:3001/tabela/search";

    // const [isVisible, setIsVisible] = useState(false);
    const [openSubmenuIds, setOpenSubmenuIds] = useState([]);
    const [clickedButtonInfo, setClickedButtonInfo] = useState([]);
    const [minCoef, setminCoef] = useState(null);
    const [maxCoef, setmaxCoef] = useState(null);

    useEffect(() => {
        console.log('openSubmenuIds atualizado:', openSubmenuIds);
    }, [openSubmenuIds]);

    useEffect(() => {
        console.log('clickedButtonInfo atualizado:', clickedButtonInfo);
    }, [clickedButtonInfo]);

    // const toggleDropdown = (resultId) => {
    //     setSelectedResults([resultId]); // Define o resultado clicado como o único resultado selecionado
    //     setIsVisible(!isVisible); // Alterna a visibilidade apenas do submenu associado ao resultado clicado
    // };

    const toggleDropdown = (event, item, level) => {
        console.log("NOVO CLIQUE");
        console.log("item", item);
        console.log("event", event.target)
        console.log("next element", event.target.nextSibling);
        console.log("level", level);

        const nextSiblingElement = event.target.nextElementSibling;

        if (nextSiblingElement.classList.contains('hidden')) {
            setOpenSubmenuIds(prevIds => {
                prevIds.push(item.id); // Adiciona o id do item
                console.log("newIds aberto:", prevIds);
                return prevIds;
            });
        
            // Remove-se a classe "hidden" e adiciona-se a classe "visible" para mostrar o dropdown
            nextSiblingElement.classList.remove('hidden');
            nextSiblingElement.classList.add('visible');
        
            // Se tiver valor, acrescentar à lista de resultados clicados
            if (item.valor) {
                setClickedButtonInfo(prevInfo => {
                    console.log('clicked button info antes de acrescentar', clickedButtonInfo);
                    console.log('prev info', prevInfo);
                    return [...prevInfo, { desc: item.desc, valor: item.valor, id: item.id }];
                });
            }
        }
        else {
            // Se o dropdown estiver visível, fecha-se
            setOpenSubmenuIds(prevIds => {
                // Mantém todos os ids que sejam diferente do item.id
                const newIds = prevIds.filter(id => id !== item.id);
                console.log("newIds fechado:", newIds);
                return newIds;
            });
            // Remove-se a classe "visible" e adiciona-se a classe "hidden" para ocultar o dropdown
            nextSiblingElement.classList.remove('visible');
            nextSiblingElement.classList.add('hidden');

            // Se fechar um resultado clicado c/ valor, retira-se da lista
            if (item.valor) {
                const indexToRemove = clickedButtonInfo.findIndex(button => button.id === item.id);
                if (indexToRemove !== -1) {
                    // Remove o botão da lista clickedButtonInfo se estiver presente
                    setClickedButtonInfo(prevInfo => {
                        const newInfo = [...prevInfo];
                        newInfo.splice(indexToRemove, 1);
                        return newInfo;
                    });
                }

            }

            
        }

    };
    
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [selectedResults, setSelectedResults] = useState([]);


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
                        {!searchText ? (
                            null
                        ) : searchResults.length > 0 ? (
                            searchResults.map((item, index) => (
                            <div key={index}>
                                {renderTabela(item, 1, toggleDropdown, openSubmenuIds)}
                                <hr />
                            </div>
                            ))
                        ) : (
                            <p>Não encontrado na tabela.</p>
                        )}
                    </div>
                </div>
            </div>

            <div id="selectedResults" className="selected">
                <div className="container">
                    <div className="row">
                        {clickedButtonInfo && clickedButtonInfo.length > 0 && (
                            <div>
                                <h5>Resultados selecionados</h5>
                                {clickedButtonInfo.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.desc}</p>
                                        <p>Coeficiente: {item.valor}</p>
                                        <hr></hr>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
           

            <Footer /> 
        </div>   
    )
}

export default Avaliacao;