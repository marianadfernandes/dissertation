import { React, useState, useEffect, useRef } from "react";
import axios from "axios";

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
                    {tabela['nota'] ? <div>Nota: {tabela['nota']}</div> : null}
                    {tabela['cod'] ? <div>Código: {tabela['cod']}</div> : null}
                    {tabela['valor'] ? <div>Valor: {tabela['valor']}</div> : null}
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

  function Tabela () {

    // const baseURL = "http://localhost:3001/tabela/listTabela";
    const baseURL = "http://54.38.159.80/aprioriapp/tabela/listTabela";

    const [tabela, setTabela] = useState([]);
    const [buttons, setButton] = useState([]);
    const [loading, setLoading] = useState(true);
    const level = 1;
    const listener = useRef(null);

  
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

  const toggleDropdown = (event, item, level) => {

    const nextSiblingElement = event.target.nextElementSibling;

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

        // Remove-se os filhos da lista 
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

const [open, setOpen] = useState(false);
const handleFirstLevel = (e) => {
  if (open === false) {
    setOpen(true)
    e.target.nextElementSibling.classList.remove('hidden');
    e.target.nextElementSibling.classList.add('visible');
    e.target.style.setProperty('background-color', 'var(--btn-bg-active)', 'important');
  } else {
    setOpen(false)
    e.target.nextElementSibling.classList.remove('visible');
    e.target.nextElementSibling.classList.add('hidden');
    e.target.style.removeProperty('background-color');
  }
};


    return (
        <div>
            <Header />
            <main>
            <div className="container padding-table">
                <div className="row table">
                    {tabela ? (
                        tabela.map((item, index) => 
                        <div className={`col-lg-12 dropdown-levels dropdown-level-${level}`}>
                        <div className={`dropdown`}>
                            <Button variant="outlined" ref={listener} onClick={(e) => handleFirstLevel(e)} className="dropbtn">
                            {index === 0 ? 'Tabela Nacional de Incapacidades por Acidentes de Trabalho ou Doenças Profissionais' : 'Tabela de Avaliação de Incapacidades Permanentes em Direito Civil'}
                            </Button>
                            <div className={`dropdown-content submenu hidden`}>
                              {item.map((subItem, index) => (
                                <a key={index}>{renderTabela(subItem, 1, toggleDropdown, buttons)}</a>))}
                            </div>
                            </div>
                        </div>)
                    ) : (
                        <p>Dados ainda estão sendo carregados...</p>
                    )}
                </div> 
            </div>
            </main>
            <Footer />
        </div>
    )
}

export default Tabela;