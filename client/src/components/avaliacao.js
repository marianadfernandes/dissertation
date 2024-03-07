import { React, useState, useEffect } from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

// Função para calcular os coeficientes com base nos valores
function calculateCoefs(valor) {
    let coefs, minCoef, maxCoef;
    if (valor.includes('-')) {
        coefs = valor.split('-');
        minCoef = parseFloat(coefs[0].replace(',', '.'));
        maxCoef = parseFloat(coefs[1].replace(',', '.'));
    } else {
        coefs = [valor];
        minCoef = parseFloat(coefs.replace(',', '.'));
        maxCoef = parseFloat(coefs.replace(',', '.'));
    }

    return { minCoef, maxCoef };
}

function Avaliacao () {

    const baseURL = "http://localhost:3001/tabela/search";

    // const [isVisible, setIsVisible] = useState(false);
    const [openSubmenuIds, setOpenSubmenuIds] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [minCoef, setminCoef] = useState(null);
    const [maxCoef, setmaxCoef] = useState(null);

    useEffect(() => {
        console.log('openSubmenuIds atualizado:', openSubmenuIds);
    }, [openSubmenuIds]);

    useEffect(() => {
        console.log('selectedResults atualizado:', selectedResults);
    }, [selectedResults]);

    // const toggleDropdown = (resultId) => {
    //     setSelectedResults([resultId]); // Define o resultado clicado como o único resultado selecionado
    //     setIsVisible(!isVisible); // Alterna a visibilidade apenas do submenu associado ao resultado clicado
    // };

    const toggleDropdown = (event, item, level) => {
        console.log("NOVO CLIQUE");
        // console.log("item", item);
        // console.log("event", event.target)
        // console.log("next element", event.target.nextSibling);
        // console.log("level", level);

        const nextSiblingElement = event.target.nextElementSibling;
        const parent = event.target.parentNode.parentNode.parentNode.parentNode;
        // console.log('parent', parent)

        if (nextSiblingElement.classList.contains('hidden')) {
            // Se tiver valor, acrescentar à lista de resultados clicados
            if (item.valor) {
                // Verificar se já existe algum "irmão" (só muda o último número do id) já presente no array
                const itemBaseId = item.id.substring(0, item.id.lastIndexOf('.', item.id.lastIndexOf('.') - 1)); // Obtém a parte do id antes do penúltimo ponto
                let i = 0;
                while (i < selectedResults.length) {
                    const button = selectedResults[i];
                    const buttonBaseId = button.id.substring(0, button.id.lastIndexOf('.', button.id.lastIndexOf('.') - 1)); // Obtém a parte do id do botão antes do penúltimo ponto
                    
                    // Verifica se o id base do botão atual é o mesmo que o id base do item
                    if (buttonBaseId === itemBaseId) {
                        // Remove o botão se for encontrado um "irmão" com o mesmo id base
                        selectedResults.splice(i, 1);

                        // Remove da lista de indices abertos
                        setOpenSubmenuIds(prevIds => prevIds.filter(id => id !== button.id));

                        // Fecha o dropdown do botão correspondente
                        let siblingToDelete;

                        // procura o elemento do botão a eliminar e de seguida procura o dropdown para fechar
                        parent.querySelectorAll('.dropbtn').forEach(element => {
                            if (element.innerHTML.includes(button.id)) {
                                siblingToDelete = element;
                            }
                        });

                        // console.log('siblingtodelete', siblingToDelete.nextElementSibling);
                        siblingToDelete.nextElementSibling.classList.remove('visible');
                        siblingToDelete.nextElementSibling.classList.add('hidden');
                    } else {
                        // Apenas incrementa o contador se nenhum botão for removido
                        i++;
                    }
                }

                // Adiciona o novo item
                setSelectedResults(prevInfo => {
                    const {minCoef, maxCoef} = calculateCoefs(item.valor);
                    return [...prevInfo, { desc: item.desc, valor: item.valor, id: item.id, min: minCoef, max: maxCoef}];
                });

                setOpenSubmenuIds(prevIds => {
                    return [...prevIds, item.id]; // Adiciona o id do item
                });
            
                // Remove-se a classe "hidden" e adiciona-se a classe "visible" para mostrar o dropdown
                nextSiblingElement.classList.remove('hidden');
                nextSiblingElement.classList.add('visible');

            } else {

                setOpenSubmenuIds(prevIds => {
                    return [...prevIds, item.id]; // Adiciona o id do item
                });
            
                // Remove-se a classe "hidden" e adiciona-se a classe "visible" para mostrar o dropdown
                nextSiblingElement.classList.remove('hidden');
                nextSiblingElement.classList.add('visible');
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
                const indexToRemove = selectedResults.findIndex(button => button.id === item.id);
                if (indexToRemove !== -1) {
                    // Remove o botão da lista selectedResults se estiver presente
                    setSelectedResults(prevInfo => {
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

    // Função para formatar o rótulo do valor
    const valueLabelFormat = (value) => {
        return `${value}`;
    };

    // Função para obter o texto do valor
    const valuetext = (value) => {
        return `${value}`;
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
                        {selectedResults && selectedResults.length > 0 && (
                            <div>
                                <h5>Resultados selecionados</h5>
                                {selectedResults.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.desc}</p>
                                        <p>Coeficiente: {item.valor}</p>
                                        <Box sx={{ width: 300 }}>
                                            <Slider
                                                aria-label="Valores restritos"
                                                defaultValue={item.min}
                                                valueLabelFormat={valueLabelFormat}
                                                getAriaValueText={valuetext}
                                                step={0.01}
                                                valueLabelDisplay="auto"
                                                marks={[
                                                    { value: item.min, label: item.min.toString() },
                                                    { value: item.max, label: item.max.toString() }
                                                ]}
                                                min={item.min}
                                                max={item.max}
                                            />
                                        </Box>

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