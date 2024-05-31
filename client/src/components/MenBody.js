import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "../menbody.css";
import "../variables.css";
import MenBodySvgComponent from "./MenBodySvgComponent";
import MenBackBodySvgComponent from "./MenBackBodySvgComponent";

import {uri} from '../App';

function renderTabela(tabela, level, toggleDropdown, buttons) {
  return (
      <div className={`dropdown-levels dropdown-level-${level}`} key={tabela.id}>
          <div className={`dropdown`}>
              <Button variant="outlined" onClick={(e) => {toggleDropdown(e, tabela, level)}} className="dropbtn">
                  {tabela['desc']}
              </Button>
              <div className={`dropdown-content submenu ${buttons[level] === tabela.id ? 'visible' : 'hidden'}`}>
                  {tabela.sub ? (tabela.sub.map((subData) => (
                      <div key={subData.id}>
                          {renderTabela(subData, level + 1, toggleDropdown, buttons)}
                      </div>
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
  const [bodyPart, setBodyPart] = useState("");

  useEffect(() => {
      console.log('buttons atualizado:', buttons);
      console.log('buttons lenght', buttons.length);
  }, [buttons]);

  const bodyPartTranslations = {
    head: "Cabeça",
    oral_cavity: "Cavidade Oral",
    eyes: "Olhos",
    nose: "Nariz",
    ears: "Orelhas",
    neck_or_throat: "Pescoço ou Garganta",
    chest: "Peito",
    upper_abdomen: "Abdômen Superior",
    mid_abdomen: "Abdômen Médio",
    lower_abdomen: "Abdômen Inferior",
    sexual_organs: "Órgãos Sexuais",
    thigh: "Coxa",
    knee: "Joelho",
    lower_leg: "Perna Inferior",
    foot: "Pé",
    nape_of_neck: "Nuca",
    back: "Costas",
    lower_back: "Parte Inferior das Costas",
    buttocks: "Nádegas",
    anus: "Ânus",
    upper_arm: "Braço Superior",
    forearm: "Antebraço",
    hand: "Mão",
    elbow: "Cotovelo",
  };

  const toggleDropdown = (event, item, level) => {

    const nextSiblingElement = event.target.nextElementSibling;
    // const parent = event.target.parentNode.parentNode.parentNode.parentNode;

    // Se o dropdown estiver fechado, abre-se
    if (nextSiblingElement.classList.contains('hidden')) {

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

  const baseURL = uri + "/body/listTabela";

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
    }
  
    fetchData();
  }, [baseURL]);

  const bodyURL = uri + "/body/search";

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

  const searchURL = uri + "/tabela/search";

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
    setLoading(true);
    // sc-body-model-svg__path--active
    // Get the id or class of the clicked path
    const pathClass = event.target.getAttribute("class");

    const pathID = event.target.getAttribute('id');
    let bodyPart = pathID.split('-')[2]
    console.log('body part:', bodyPart);
    const translatedBodyPart = bodyPartTranslations[bodyPart] || bodyPart;

    setBodyPart(translatedBodyPart);

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
    setLoading(false);

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
    <div className="general-page">
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
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        role="img"
                        className="ui-icon ui-button__icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M40 22c0 1-.453 2.402-3.648 4-1.301.652-2.692 1.117-4.352 1.434v3.957c7.848-1.336 12-4.77 12-9.391 0-6-8.953-10-20-10S4 16 4 22c0 5.43 5.73 9.219 16.45 9.895l-3.762 3.761 2.828 2.828L28 30l-8.484-8.484-2.828 2.828 3.566 3.57c-3.79-.203-6.332-.777-8.606-1.914C8.453 24.402 8 23 8 22s.453-2.402 3.648-4c2.954-1.477 7.317-2 12.352-2s9.398.523 12.352 2C39.547 19.598 40 21 40 22zm0 0"
                        ></path>
                      </svg> */}
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzklEQVR4nO2ZT4iNURTAfyYpxp+mMWVkZfZSgzANIpGFEhYs/NlMkSJiFGk0SBMbO81kYaFQyFhbTJGFTFboaRSxEMObGSJmPt06U/q69333e+++P1/v/Opsvr5z7jn3vnPOPd8DRVEURVEURVEURVEURQnBYqATOAD0AreAIeA5kAPeA6PAH5FReZaTd4ZEp1dsGFut1DBLgS7gJvABiMokn4FBoBtoBxqqGXQHMCCnF1VJvgL9wNpKBd0su/+6ikG75JX4ZnwMTqPk45inMyavh4G7QB9wCNgiP9s2YAnQBMwUaZJnbfLOVtHpExvDYtNn7TxwHpgTKvjNwLuERX8CD4HTwLqQi/+Hsble1hiUNQv5NAJsLHXRM8CkY4FfwH1gDzCXyjMP2As8EF9sPv6VtCiKyw6j48AVaXW1gvHlKjDh8PliWoMHHYYGylVkArEQuOHwfZ+vkRZLsTOtbgfZYaelPed9D6/H8pNfTvZot6TEOR/FFzGlY2SX47FYzDU7kbGYksmrrNISi8XElsh4TKmWi14SiyxX59QpcIrscjIWy7NiiuBvYDXZYxXwIxaL2RCvvMlbcse0lhBcB2ZRXrYB32MxfEuTzvstF4kpGT1L/TBhbD0t002yWXycsvi/K62xC44b1YRcLc30VgzTdj4BawhDq/jkmla9+r+NEzJQuAaNR7KzZjDxJV5fzJekYkf03cC9AqOyeX6UEumU0bLQ6GkCeSwdoyNhOrTpF1MXksbhNyGL92zgrPTRyEMmxYHbwCXgCLAdWFFAJ21dcNn5IgdhfA5OI3BYgovKIGnqQlw3J7P/fCpAA7AJuObxtSit+NaF6Q3rF19mUEWWySXjDvDW0YZCb8DKagddiAXABgmkR07JdIyXAVMgs0QOeVLr//6EIlQbzCxRoItQZolEPtZDvtuoq3y3UVf5riiKoiiKoiiKolCD/AO5qet1+pbkSwAAAABJRU5ErkJggg==" alt=""></img>
                    </div>
                  </div>
                </div>

                <div className="body-results col-md-9">
                  <div id="searchResults" className="results">
                    <div className="container">
                      <div className="row">
                      {loading ? (
                          <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                          </Box>
                        ) : (
                        searchBodyParts && searchResults.length > 0 ? (
                          <>
                          <h5>{bodyPart}</h5>
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
                        ) : null)}
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
