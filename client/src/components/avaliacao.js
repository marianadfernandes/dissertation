import { React, useState, useEffect } from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button";

import Header from "./header";
import Footer from "./footer";


function renderTabela(tabela, level, toggleDropdown, buttons) {
    return (
        <div className={`dropdown-levels dropdown-level-${level}`} key={tabela.id}>
            <div className={`dropdown`}>
                <Button variant="outlined" onClick={(e) => {toggleDropdown(e, tabela, level)}} className="dropbtn">
                    {tabela['desc']}
                </Button>
                <div className={`dropdown-content submenu ${buttons[level] === tabela.id ? 'visible' : 'hidden'}`}>
                    {tabela['nota'] ? <a>Nota: {tabela['nota']}</a> : null}
                    {tabela['valor'] ? <a>Valor: {tabela['valor']}</a> : null}
                    {/* {tabela['refs'] ? <div>{retrieveRefs(tabela)}</div> : null} */}
                    {tabela.sub ? (tabela.sub.map((subData) => (
                        <a key={subData.id}>
                            {renderTabela(subData, level + 1, toggleDropdown, buttons)}
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
        minCoef = parseFloat(coefs[0].replace(',', '.'));
        maxCoef = parseFloat(coefs[0].replace(',', '.'));
    }

    return { minCoef, maxCoef };
}

function Avaliacao () {

    const baseURL = "http://localhost:3001/tabela/search";

    const [minCoef, setminCoef] = useState(null);
    const [maxCoef, setmaxCoef] = useState(null);
    const [buttons, setButton] = useState([]);
    const [refsResults, setRefsResults] = useState([]);

    useEffect(() => {
        console.log('buttons atualizado:', buttons);
        console.log('buttons lenght', buttons.length)
    }, [buttons]);

    // const retrieveRefs = (id, level) => {

    //     axios.get(`${baseURL}/${id}`).then((response) => {
    //         console.log(JSON.stringify(response.data));
    //         setRefsResults(response.data);
    
    //         // Move o forEach para dentro da promessa axios
    //         response.data.forEach(element => {
    //             console.log('ele', element);
    //             renderTabela(element, level + 1, toggleDropdown, retrieveRefs, buttons)
    //         });
    //     });
    // };

    const toggleDropdown = (event, item, level) => {
        console.log("NOVO CLIQUE");
        console.log("item", item);
        console.log("event", event.target)
        console.log("next element", event.target.nextSibling);
        console.log("level", level);

        const nextSiblingElement = event.target.nextElementSibling;
        const parent = event.target.parentNode.parentNode.parentNode.parentNode;
        console.log('parent', parent)

        // Se o dropdown estiver fechado, abre-se
        if (nextSiblingElement.classList.contains('hidden')) {

            // Se tiver valor, acrescentar à lista de resultados clicados
            if (item.valor) {
                console.log('sou um botão com valor')

                // Filtrando o array buttons uma vez antes do loop
                const filteredButtons = buttons.filter(item => item.hasOwnProperty('min'));
                console.log('filteredbuttons', filteredButtons)

                // Verificando se há botões a serem removidos
                if (filteredButtons.length > 0) {
                    const itemBaseId = item.id.substring(0, item.id.lastIndexOf('.', item.id.lastIndexOf('.') - 1)); // Obtém a parte do id antes do penúltimo ponto
                    console.log('itembaseid', itemBaseId);

                    // Criando uma cópia do array de botões para posterior atualização do estado
                    let updatedButtons = [...buttons];

                    // Iterando sobre os botões filtrados
                    for (let i = 0; i < filteredButtons.length; i++) {
                        const button = filteredButtons[i];
                        const buttonBaseId = button.id.substring(0, button.id.lastIndexOf('.', button.id.lastIndexOf('.') - 1)); // Obtém a parte do id do botão antes do penúltimo ponto
                        console.log('buttonbaseid', buttonBaseId);

                        // Verificando se o id base do botão atual é o mesmo que o id base do item
                        if (buttonBaseId === itemBaseId) {
                            console.log('ESTOU A REMVOER este', button)
                            // Removendo o botão do array atualizado
                            updatedButtons = updatedButtons.filter(btn => btn.id !== button.id);
                            console.log('updated buttons', updatedButtons);

                            // Fechando o dropdown do botão correspondente
                            let siblingToDelete;
                            parent.querySelectorAll('.dropbtn').forEach(element => {
                                if (element.innerHTML.includes(button.desc)) {
                                    siblingToDelete = element;
                                }
                            });

                            console.log('sibling to delete', siblingToDelete);
                            console.log('sibling to delete next element', siblingToDelete.nextElementSibling);

                            siblingToDelete.style.removeProperty('background-color');
                            siblingToDelete.nextElementSibling.classList.remove('visible');
                            siblingToDelete.nextElementSibling.classList.add('hidden');
                        }
                    }

                    // Atualizando o estado com o novo array de botões
                    setButton(updatedButtons);
                }

                const {minCoef, maxCoef} = calculateCoefs(item.valor);
                setButton (prevInfo => {
                    return [...prevInfo, { id: item.id, desc: item.desc, min: minCoef, max: maxCoef, slider: minCoef}];
                });

                
            } else if (item.refs) {
                
                axios.get(`${baseURL}/${item.refs[0]}`).then((response) => {
                    console.log(JSON.stringify(response.data));
                    setRefsResults(response.data);
            
                    response.data.forEach(element => {
                        console.log('ele', element);
                        renderTabela(element, level, toggleDropdown, buttons)
                    });
                });

            } else {

                setButton (prevInfo => {
                    return [...prevInfo, { id: item.id, desc: item.desc }];
                });

            }

            event.target.style.setProperty('background-color', 'var(--btn-bg-active)', 'important');
            // Remove-se a classe "hidden" e adiciona-se a classe "visible" para mostrar o dropdown
            nextSiblingElement.classList.remove('hidden');
            nextSiblingElement.classList.add('visible');
            
        // Se o dropdown estiver aberto, fecha-se
        } else {
            console.log('estou a remover este', item)

            // Remove-se da lista
            setButton(prevIds => {
                // Mantém todos os ids que sejam diferente do item.id
                const newIds = prevIds.filter(id => id.id !== item.id);
                return newIds;
            });
            
            // Remove-se a classe "visible" e adiciona-se a classe "hidden" para ocultar o dropdown
            nextSiblingElement.classList.remove('visible');
            nextSiblingElement.classList.add('hidden');
            event.target.style.removeProperty('background-color');

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


    const handleSliderValue = (sliderId) => (event, newValue) => {
        // Verifica se já existe um objeto com o mesmo id no array
        const existingIndex = buttons.findIndex(item => item.id === sliderId);
    
        const updatedSliderValues = [...buttons];
        updatedSliderValues[existingIndex]['slider'] = newValue
        setButton(updatedSliderValues);

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
                                {renderTabela(item, 1, toggleDropdown, buttons)}
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
                        {buttons && buttons.filter(item => item.hasOwnProperty('min')).length > 0 && (
                            <div>
                                <h5>Resultados selecionados</h5>
                                <div className="underline-1"></div>
                                {buttons.filter(item => item.hasOwnProperty('min')).map((item, index) => (
                                    <div key={index} className="result-row">
                                        <p>{item.desc}</p>
                                        <Box sx={{ width: 300 }}>
                                            <Slider
                                                aria-label="Valores restritos"
                                                defaultValue={item.min}
                                                valueLabelFormat={valueLabelFormat}
                                                getAriaValueText={valuetext}
                                                step={0.01}
                                                valueLabelDisplay="on"
                                                marks={[
                                                    { value: item.min, label: item.min.toString() },
                                                    { value: item.max, label: item.max.toString() }
                                                ]}
                                                min={item.min}
                                                max={item.max}
                                                onChange={handleSliderValue(item.id)}
                                            />
                                        </Box>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div id="totalResult" className="total">
                <div className="container">
                    <div className="row">
                        {buttons && buttons.filter(item => item.hasOwnProperty('min')).length > 0 && (
                            <div>
                                <h5>Total</h5>
                                    <p>
                                    {buttons.filter(item => item.slider).reduce((accumulator, currentValue) => accumulator + currentValue.slider, 0).toFixed(2) < 1 ?
                                    buttons.filter(item => item.slider).reduce((accumulator, currentValue) => accumulator + currentValue.slider, 0).toFixed(2) : '1.00'}
                                    </p>
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