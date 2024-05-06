import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

import Button from "@mui/material/Button";

import "../menbody.css";
import "../variables.css";
import MenBodySvgComponent from "./MenBodySvgComponent";
import MenBackBodySvgComponent from "./MenBackBodySvgComponent";

function renderTabela(tabela, level, toggleDropdown, buttons) {
  return (
      <div className={`dropdown-levels dropdown-level-${level}`} key={tabela.id}>
          <div className={`dropdown`}>
              <Button variant="outlined" onClick={(e) => {toggleDropdown(e, tabela, level)}} className="dropbtn">
                  {tabela['desc']}
              </Button>
              <div className={`dropdown-content submenu ${buttons[level] === tabela.id ? 'visible' : 'hidden'}`}>
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


const HumanBody = () => {
  //   const [selectedArea, setSelectedArea] = useState("");
  const [showFront, setShowFront] = useState(true);
  const [tabela, setTabela] = useState([]);
  const [loading, setLoading] = useState(true);

  const [buttons, setButton] = useState([]);

  useEffect(() => {
      console.log('buttons atualizado:', buttons);
      console.log('buttons lenght', buttons.length);
  }, [buttons]);

  const toggleDropdown = (event, item, level) => {

    const nextSiblingElement = event.target.nextElementSibling;
    const parent = event.target.parentNode.parentNode.parentNode.parentNode;

    // Se o dropdown estiver fechado, abre-se
    if (nextSiblingElement.classList.contains('hidden')) {

        // // Se tiver valor, acrescentar à lista de resultados clicados
        // if (item.valor) {

        //     // Filtrando o array buttons uma vez antes do loop
        //     const filteredButtons = buttons.filter(item => item.hasOwnProperty('min'));

        //     // Verificando se há botões a serem removidos
        //     if (filteredButtons.length > 0) {
        //         const itemBaseId = item.id.substring(0, item.id.lastIndexOf('.', item.id.lastIndexOf('.') - 1)); // Obtém a parte do id antes do penúltimo ponto

        //         // Criando uma cópia do array de botões para posterior atualização do estado
        //         let updatedButtons = [...buttons];

        //         // Iterando sobre os botões filtrados
        //         for (let i = 0; i < filteredButtons.length; i++) {
        //             const button = filteredButtons[i];
        //             const buttonBaseId = button.id.substring(0, button.id.lastIndexOf('.', button.id.lastIndexOf('.') - 1)); // Obtém a parte do id do botão antes do penúltimo ponto

        //             // Verificando se o id base do botão atual é o mesmo que o id base do item
        //             if (buttonBaseId === itemBaseId) {

        //                 // Removendo o botão do array atualizado
        //                 updatedButtons = updatedButtons.filter(btn => btn.id !== button.id);

        //                 // Fechando o dropdown do botão correspondente
        //                 let siblingToDelete;
        //                 parent.querySelectorAll('.dropbtn').forEach(element => {
        //                     if (element.innerHTML.includes(button.desc)) {
        //                         siblingToDelete = element;
        //                     }
        //                 });


        //                 siblingToDelete.style.removeProperty('background-color');
        //                 siblingToDelete.nextElementSibling.classList.remove('visible');
        //                 siblingToDelete.nextElementSibling.classList.add('hidden');

        //                 var larguraAtual = parseInt(siblingToDelete.nextElementSibling.style.width);
        //                 var novaLargura = larguraAtual - 50; // Diminui a largura

        //                 siblingToDelete.nextElementSibling.style.width = novaLargura + "px"; // Define a nova largura
        //             }
        //         }

        //         // Atualizando o estado com o novo array de botões
        //         setButton(updatedButtons);
        //     }

        //     // const {minCoef, maxCoef} = calculateCoefs(item.valor);
        //     setButton (prevInfo => {
        //         return [...prevInfo, { id: item.id, desc: item.desc }];
        //     });

        // } else {

        setButton (prevInfo => {
            return [...prevInfo, { id: item.id, desc: item.desc }];
        });

        // Remove-se a classe "hidden" e adiciona-se a classe "visible" para mostrar o dropdown
        nextSiblingElement.classList.remove('hidden');
        nextSiblingElement.classList.add('visible');
        event.target.style.setProperty('background-color', 'var(--btn-bg-active)', 'important');

        // Atualiza a largura
        nextSiblingElement.style.width = (100 - level * 2) + '%' 
        nextSiblingElement.style.marginLeft = 'auto'
        nextSiblingElement.style.marginRight = 'auto'
        
    // Se o dropdown estiver aberto, fecha-se
    } else {

        // Remove-se da lista
        setButton(prevIds => {
            // Mantém todos os ids que sejam diferente do item.id
            const newIds = prevIds.filter(id => id.id !== item.id);
            return newIds;
        });

        // Remove-se of filhos da lista 
        buttons.forEach(element => {
            if (element.id.includes(item.id)) {
                setButton(prevIds => {
                    // Mantém todos os ids que sejam diferente do item.id
                    const newIds = prevIds.filter(id => id.id !== element.id);
                    return newIds;
                });
            }
        });
        
        // Remove-se a classe "visible" e adiciona-se a classe "hidden" para ocultar o dropdown

        // Para os filhos
        let sonToDelete = [];
        event.target.nextElementSibling.querySelectorAll('.dropbtn').forEach(element => {
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

  const baseURL = "http://localhost:3001/body/listTabela";
  // const baseURL = "http://54.38.159.80/aprioriapp/body/listTabela";

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

  const bodyURL = "http://localhost:3001/body/search";
  // const bodyURL = "http://54.38.159.80/aprioriapp/body/search";

  const [searchBodyParts, setSearchBodyParts] = useState([]);

  const fetchIDs = async (searchID) => {
    console.log('fetching data w/', searchID)
    try {
      const response = await axios.get(`${bodyURL}/${searchID}`);
      console.log(response);
      setSearchBodyParts(response.data);
      // console.log('ids extraídos', response.data);
      return response.data; // Retorna os dados da busca
    } catch (error) {
      console.error('Error fetching search results:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  };

  const [searchResults, setSearchResults] = useState([]);

  const searchURL = "http://localhost:3001/tabela/search";
  // const searchURL = "http://54.38.159.80/aprioriapp/tabela/search";

  const fetchSearchResult = async (searchID, tabelaID) => {
    console.log('fetching data w/', searchID)
    try {
      const response = await axios.get(`${searchURL}/${searchID}/${tabelaID}`);
      console.log(response);
      return response.data; // Retornar os resultados da busca
    } catch (error) {
      console.error('Error fetching search results:', error);
      return []; // Retornar um array vazio em caso de erro
    }
  };

  const handleButtonClick = () => {
    setShowFront((prev) => !prev); // Alternar entre true e false
  };

  const handlePieceClick = async (event) => {
    // sc-body-model-svg__path--active
    // Get the id or class of the clicked path
    const pathClass = event.target.getAttribute("class");

    const pathID = event.target.getAttribute('id');
    let bodyPart = pathID.split('-')[2]
    console.log('body part:', bodyPart);

   // Chama fetchIDs e aguarda a resolução da promessa
    const idsExtracted = await fetchIDs(bodyPart);
    console.log('ids extraidos:', idsExtracted);

    let allResults = []; // Array para armazenar todos os resultados de busca

    // Iterar sobre as tabelas e ids extraídos
    for (let tabela in idsExtracted) {
      for (let id in idsExtracted[tabela]) {
        const results = await fetchSearchResult(idsExtracted[tabela][id], tabela);
        allResults = [...allResults, ...results]; // Adicionar os resultados ao array allResults
      }
    }

    console.log('all results', allResults);
    setSearchResults(allResults);

    // Remove 'sc-body-model-svg__path--active' from all paths
    const activePath = document.querySelector(
      ".sc-body-model-svg__path--active",
    );
    if (activePath) {
      activePath.classList.remove("sc-body-model-svg__path--active");
    }

    // Check if the element exists
    if (pathClass) {
      // Add the 'newClass' and remove the 'originalClass'
      event.target.setAttribute(
        "class",
        `${pathClass} sc-body-model-svg__path--active`,
      );
    }
  };

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

  return (
    <div>
      <Header>
      </Header>

      <main>
        <div className="human-body">
            <div className="container">
                <div className="row">
                <div className="col-md-3">
                  <div className="sc-body-model evidence-search-body-widget__body-model">
                    <div className="ui-dropdown ui-dropdown--compact sc-body-model__dropdown">
                      {showFront ? (
                        <MenBodySvgComponent handlePieceClick={handlePieceClick} />
                      ) : (
                        <MenBackBodySvgComponent handlePieceClick={handlePieceClick} />
                      )}
                    </div>

                    <div
                      className="ui-button ui-button--text sc-body-model__rotate"
                      id="rotate"
                      ariaHidden="true"
                      tabIndex="-1"
                      onClick={handleButtonClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        role="img"
                        className="ui-icon ui-button__icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M40 22c0 1-.453 2.402-3.648 4-1.301.652-2.692 1.117-4.352 1.434v3.957c7.848-1.336 12-4.77 12-9.391 0-6-8.953-10-20-10S4 16 4 22c0 5.43 5.73 9.219 16.45 9.895l-3.762 3.761 2.828 2.828L28 30l-8.484-8.484-2.828 2.828 3.566 3.57c-3.79-.203-6.332-.777-8.606-1.914C8.453 24.402 8 23 8 22s.453-2.402 3.648-4c2.954-1.477 7.317-2 12.352-2s9.398.523 12.352 2C39.547 19.598 40 21 40 22zm0 0"
                        ></path>
                      </svg>
                      Rotate model 
                    </div>
                  </div>
                </div>

                <div className="body-results col-md-9">
                  <div id="searchResults" className="results">
                    <div className="container">
                      <div className="row">
                        {searchBodyParts && searchResults ? (
                          <>
                          <h6>Tabela Nacional de Incapacidades por Acidentes de Trabalho ou Doenças Profissionais</h6>
                          {/* Resultados sem 'cod' */}
                          {searchResults.filter(item => !hasCod(item)).map((item, index) => (
                             <div key={index}>
                                 {renderTabela(item, 1, toggleDropdown, buttons)}
                                 <hr />
                             </div>
                          ))}
                          <br></br>
                          <h6>Tabela de Avaliação de Incapacidades Permanentes em Direito Civil</h6>
                          {/* Resultados com 'cod' */}
                          {searchResults.filter(item => hasCod(item)).map((item, index) => (
                              <div key={index}>
                                  {renderTabela(item, 1, toggleDropdown, buttons)}
                                  <hr />
                              </div>
                          ))}
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>

      <Footer>
      </Footer>
    </div>
  );
};

export default HumanBody;
