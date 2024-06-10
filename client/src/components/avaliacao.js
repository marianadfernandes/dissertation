import { React, useState, useEffect } from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import confirm_icon from "../img/confirm-icon.png";

import Header from "./header";
import Footer from "./footer";

import {uri} from '../App';

function ConfirmDialog({ open, handleClose, handleConfirm, data }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
            fullWidth='md'
        >
            <DialogTitle id="confirmation-dialog-title"></DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    <img className="confirm-icon" src={confirm_icon} alt=""></img>
                    Tem certeza que deseja submeter os seguintes dados?
                </DialogContentText>
                <Grid container spacing={2}>
                {Object.entries(data).map(([key, value], index) => (
                    <Grid item xs={12} key={index}>
                        <Typography variant="h6">{value.desc}</Typography>
                        <Typography variant="body2"><strong>Incapacidade:</strong> {value.slider}</Typography>
                    </Grid>
                ))}
                <Typography variant="h5"><strong>Incapacidade total: </strong>{data.filter(item => item.slider).reduce((accumulator, currentValue) => accumulator + currentValue.slider, 0).toFixed(2) < 1 ?
                                        data.filter(item => item.slider).reduce((accumulator, currentValue) => accumulator + currentValue.slider, 0).toFixed(2) : '1.00'}</Typography>
                </Grid>


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} variant="outlined" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}



function renderTabela(tabela, level, toggleDropdown, buttons) {
    return (
        <div className={`dropdown-levels dropdown-level-${level}`} key={tabela.id}>
            <div className={`dropdown`}>
                <Button variant="outlined" onClick={(e) => {toggleDropdown(e, tabela, level)}} className="dropbtn">
                    {tabela['desc']}
                </Button>
                <div className={`dropdown-content submenu ${buttons[level] === tabela.id ? 'visible' : 'hidden'}`}>
                    {/* {tabela['nota'] ? <div>Nota: {tabela['nota']}</div> : null}
                    {tabela['cod'] ? <div>Código: {tabela['cod']}</div> : null}
                    {tabela['valor'] ? <div>Valor: {tabela['valor']}</div> : null} */}
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
        for (let i = 0; i < coefs.length; i++) {
            if (coefs[i] >= 1) {
                coefs[i] = coefs[i] / 100;
            }
        }
        console.log('coefs', coefs)
        if (String(coefs[0]).includes(',') && String(coefs[1]).includes(',')) {
            minCoef = parseFloat(coefs[0].replace(',', '.'));
            maxCoef = parseFloat(coefs[1].replace(',', '.'));
        } else {
            minCoef = parseFloat(coefs[0]);
            maxCoef = parseFloat(coefs[1]);
        }
    } else {
        coefs = [valor];
        if (coefs[0] >= 1) {
           coefs[0] = coefs[0] / 100
        } 
        if (String(coefs[0]).includes(',')) {
            minCoef = parseFloat(coefs[0].replace(',', '.'));
            maxCoef = parseFloat(coefs[0].replace(',', '.'));
        } else {
            minCoef = parseFloat(coefs[0]);
            maxCoef = parseFloat(coefs[0]);
        }

    }

    return { minCoef, maxCoef };
}

function Avaliacao () {

    const baseURL = uri + "/tabela/search";

    const [buttons, setButton] = useState([]);

    useEffect(() => {
        console.log('buttons atualizado:', buttons);
        console.log('buttons lenght', buttons.length);
        console.log('buttons c/ resultado:', buttons.filter(item => item.hasOwnProperty('min')));
        console.log('url', baseURL)
    }, [buttons]);


    const toggleDropdown = (event, item, level) => {

        const nextSiblingElement = event.target.nextElementSibling;
        const parent = event.target.parentNode.parentNode.parentNode.parentNode;

        // Se o dropdown estiver fechado, abre-se
        if (nextSiblingElement.classList.contains('hidden')) {

            // Se tiver valor, acrescentar à lista de resultados clicados
            if (item.valor) {

                // Filtrando o array buttons uma vez antes do loop
                const filteredButtons = buttons.filter(item => item.hasOwnProperty('min'));

                // Verificando se há botões a serem removidos
                if (filteredButtons.length > 0) {
                    const itemBaseId = item.id.substring(0, item.id.lastIndexOf('.', item.id.lastIndexOf('.') - 1)); // Obtém a parte do id antes do penúltimo ponto

                    // Criando uma cópia do array de botões para posterior atualização do estado
                    let updatedButtons = [...buttons];

                    // Iterando sobre os botões filtrados
                    for (let i = 0; i < filteredButtons.length; i++) {
                        const button = filteredButtons[i];
                        const buttonBaseId = button.id.substring(0, button.id.lastIndexOf('.', button.id.lastIndexOf('.') - 1)); // Obtém a parte do id do botão antes do penúltimo ponto

                        // Verificando se o id base do botão atual é o mesmo que o id base do item
                        if (buttonBaseId === itemBaseId) {

                            // Removendo o botão do array atualizado
                            updatedButtons = updatedButtons.filter(btn => btn.id !== button.id);

                            // Fechando o dropdown do botão correspondente
                            let siblingToDelete;
                            parent.querySelectorAll('.dropbtn').forEach(element => {
                                if (element.innerHTML.includes(button.desc)) {
                                    siblingToDelete = element;
                                }
                            });


                            siblingToDelete.style.removeProperty('background-color');
                            siblingToDelete.nextElementSibling.classList.remove('visible');
                            siblingToDelete.nextElementSibling.classList.add('hidden');

                            var larguraAtual = parseInt(siblingToDelete.nextElementSibling.style.width);
                            var novaLargura = larguraAtual - 50; // Diminui a largura

                            siblingToDelete.nextElementSibling.style.width = novaLargura + "px"; // Define a nova largura
                        }
                    }

                    // Atualizando o estado com o novo array de botões
                    setButton(updatedButtons);
                }

                const {minCoef, maxCoef} = calculateCoefs(item.valor);
                setButton (prevInfo => {
                    return [...prevInfo, { id: item.id, desc: item.desc, min: minCoef, max: maxCoef, slider: minCoef}];
                });

            } else {

                setButton (prevInfo => {
                    return [...prevInfo, { id: item.id, desc: item.desc }];
                });

            }

            // Remove-se a classe "hidden" e adiciona-se a classe "visible" para mostrar o dropdown
            nextSiblingElement.classList.remove('hidden');
            nextSiblingElement.classList.add('visible');
            event.target.style.setProperty('background-color', 'var(--btn-bg-active)', 'important');

            // Atualiza a largura
            nextSiblingElement.style.width = (100 - level * 2) + '%' 
            nextSiblingElement.style.marginLeft = 'auto'
            // nextSiblingElement.style.marginRight = 'auto'
            
        // Se o dropdown estiver aberto, fecha-se
        } else {

            // Remove-se da lista
            setButton(prevIds => {
                // Mantém todos os ids que sejam diferente do item.id
                const newIds = prevIds.filter(id => id.id !== item.id);
                return newIds;
            });

            // // Remove-se of filhos da lista 
            // buttons.forEach(element => {
            //     if (element.id.includes(item.id)) {
            //         setButton(prevIds => {
            //             // Mantém todos os ids que sejam diferente do item.id
            //             const newIds = prevIds.filter(id => id.id !== element.id);
            //             return newIds;
            //         });
            //     }
            // });
            
            // Remove-se a classe "visible" e adiciona-se a classe "hidden" para ocultar o dropdown

            // Para os filhos
            let sonToDelete = [];
            event.target.nextElementSibling.querySelectorAll('.dropbtn').forEach(element => {
                setButton(prevIds => {
                    const newIds = prevIds.filter(item => item.desc !== element.innerText);
                    return newIds;
                })
                sonToDelete.push(element.nextElementSibling);
            });


            sonToDelete.forEach(element => {
                if (element.classList.contains('visible')) {
                    element.parentElement.querySelector('.dropbtn').style.removeProperty('background-color');
                    element.classList.remove('visible');
                    element.classList.add('hidden');
                }
            });


            // Para o 'pai'
            nextSiblingElement.classList.remove('visible');
            nextSiblingElement.classList.add('hidden');
            event.target.style.removeProperty('background-color');
        }

    };
    
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchData = async () => {
        console.log('fetching data w/', searchText)
        try {
            const response = await axios.get(`${baseURL}/${searchText}`);
            console.log(response);
            setSearchResults(response.data);
            console.log(searchResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        if (searchText.trim().length >= 4) {
            fetchData();
        } else {
            setSearchResults([]); 
        }
    }, [searchText]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (searchText.length > 3) {
            fetchData();
        }
    };

    const handleSearch = () => {
        console.log('clique', searchText)
        if (searchText.length > 0) {
            fetchData(); 
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

    const handleDelete = (itemId) => (event) => {
        const existingIndex = buttons.findIndex(item => item.id === itemId);

        const desc = buttons[existingIndex].desc;
        const targetElements = document.querySelectorAll(`.dropdown-levels .dropdown .dropbtn`);
        let targetButton = null;
        targetElements.forEach(button => {
            if (button.textContent.trim() === desc) {
                targetButton = button;
                return;
            }
        })
       
        if (targetButton) { 
            const nextSibling = targetButton.nextSibling;
            if (nextSibling) { 
                nextSibling.classList.remove('visible');
                nextSibling.classList.add('hidden');
            }
            targetButton.style.removeProperty('background-color');
        }
        if (existingIndex !== -1) {
            const newButtons = [...buttons]; 
            newButtons.splice(existingIndex, 1); 
            setButton(newButtons);
        }

    }

    const handleClose = () => {

        const targetElements = document.querySelectorAll('.dropdown-content.submenu.visible');

        targetElements.forEach(element => {
            element.classList.remove('visible');
            element.classList.add('hidden');
            element.parentElement.querySelector('.dropbtn').style.removeProperty('background-color');
        })

    }

    function hasCod(item) {
        if (item.cod) {
            return true;
        }
        if (item.sub) {
            for (let i = 0; i < item.sub.length; i++) {
                if (hasCod(item.sub[i])) {
                    return true;
                }
            }
        }
        return false;
    }

    const hasButtons = buttons && buttons.filter(item => item.hasOwnProperty('min')).length > 0;

    const [open, setOpen] = useState(false); 
    const [confirmData, setConfirmData] = useState({});

    const handleSubmitButton = () => {
        setConfirmData(buttons.filter(item => item.hasOwnProperty('min')));
        setOpen(true);
        console.log('Dados submetidos', buttons.filter(item => item.hasOwnProperty('min')))
    };

    const handleCloseConfirm = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        // Lógica de confirmação
        console.log("Dados confirmados:", confirmData);
        setOpen(false);
    };

    return (
        <div className="general-page">
            <Header />
            <main>
            <div className="search-bar">
                <div className="container">
                        <h6>Pesquise pela incapacidade a avaliar</h6>
                        <div className="underline-1"></div>
                    <div className="row">
                        <nav className="navbar navbar-light bg-light">
                            <form className="form-inline" onSubmit={handleSubmit} onChange={handleSubmit}>
                                <input className="form-control mr-lg-2" 
                                        type="search" 
                                        placeholder="Pesquisa..." 
                                        aria-label="Search" 
                                        value={searchText} 
                                        onChange={handleSearchChange}/>
                                <button className="btn-2" type="submit" onClick={handleSearch}>Pesquisa</button>
                            </form>
                        </nav>  
                    </div>
                </div>
            </div>

            <div className="container">            
                <div className={`injury-assessment ${hasButtons ? 'two-columns' : ''}`}>
                    <div id="searchResults" className="results">
                        <div className="row">
                            {(!searchText || searchText.length < 4) && searchResults.length === 0 ? (
                                null
                            ) : searchResults.length > 0 ? (
                                <>
                                <Button variant="outlined" className="closebnt" startIcon={<CloseIcon />} onClick={handleClose}>
                                    Fechar tudo
                                </Button>
                                <h6>Tabela Nacional de Incapacidades por Acidentes de Trabalho ou Doenças Profissionais</h6>
                                {/* Resultados sem 'cod' */}
                                {searchResults.filter(item => !hasCod(item)).map((item, index) => (
                                    <div key={index}>
                                        {renderTabela(item, 1, toggleDropdown, buttons)}
                                    </div>
                                ))}
                                <br></br>
                                <h6>Tabela de Avaliação de Incapacidades Permanentes em Direito Civil</h6>
                                {/* Resultados com 'cod' */}
                                {searchResults.filter(item => hasCod(item)).map((item, index) => (
                                    <div key={index}>
                                        {renderTabela(item, 1, toggleDropdown, buttons)}
                                    </div>
                                ))}
                                </>
                            ) : (
                                <p>Não encontrado na tabela.</p>
                            )}
                        </div>
                    </div>

                    {hasButtons && (
                    <div className="selected-total-container">
                        <div id="selectedResults" className="selected">
                            <div className="row">
                                <div>
                                    <h5>Resultados selecionados</h5>
                                    <div className="underline-1"></div>
                                    {buttons.filter(item => item.hasOwnProperty('min')).map((item, index) => (
                                        <div key={index} className="result-row">
                                            <p>{item.desc}</p>
                                            <Box sx={{ width: 100 }}>
                                                <Slider
                                                    aria-label="Valores restritos"
                                                    defaultValue={item.min}
                                                    valueLabelFormat={valueLabelFormat}
                                                    getAriaValueText={valuetext}
                                                    step={0.01}
                                                    valueLabelDisplay="off"
                                                    marks={[
                                                        { value: item.min, label: item.min.toString() },
                                                        { value: item.max, label: item.max.toString() }
                                                    ]}
                                                    min={item.min}
                                                    max={item.max}
                                                    onChange={handleSliderValue(item.id)}
                                                />
                                            </Box>
                                            <IconButton aria-label="delete" onClick={handleDelete(item.id)} >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                

                        <div id="totalResult" className="total">
                            <div className="row">
                                <div className="total-row">
                                    <h5>Total</h5>
                                    <div className="total-content">
                                        <p>
                                            {(() => {
                                                const total = buttons
                                                    .filter(item => item.slider)
                                                    .reduce((accumulator, currentValue) => accumulator + currentValue.slider, 0);
                                                const totalFixed = total.toFixed(2);
                                                return total < 1 ? totalFixed : '1.00';
                                            })()}
                                        </p>
                                        <Button className='submitbtn' 
                                            endIcon={<NavigateNextIcon/>}
                                            variant="outlined" 
                                            onClick={handleSubmitButton}>Submeter</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>

            <ConfirmDialog
                open={open}
                handleClose={handleCloseConfirm}
                handleConfirm={handleConfirm}
                data={confirmData}
            />
           
            </main>
            <Footer /> 
        </div>   
    )
}

export default Avaliacao;