import { React, useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

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

  function renderTabela(tabela, level) {
    return (
      <div className={`col-lg-12 dropdown-levels dropdown-level-${level}`}>
        {Object.keys(tabela).map((key) => (
          <div className={`dropdown`}>
            <button className="dropbtn">
              {tabela[key]['id']} {tabela[key]['desc']}
            </button>
            <div className={`dropdown-content submenu`}>
              {tabela[key]['cod'] ? <a>Código: {tabela[key]['cod']}</a> : null}
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

  function Tabela () {

    const baseURL = "http://localhost:3001/tabela/listTabela";

    const [tabela, setTabela] = useState([]);
    const [loading, setLoading] = useState(true); 
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
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };
  
    fetchData();
  }, []);

    return (
        <div>
            <Header />
            <div className="container padding-table">
                <div className="row table">
                    {tabela ? (
                        tabela.map((item, index, level) => 
                        <div className={`col-lg-12 dropdown-levels dropdown-level-${level}`}>
                        <div className={`dropdown`}>
                            <button className="dropbtn">
                            {index === 0 ? 'Tabela Nacional de Incapacidades por Acidentes de Trabalho ou Doenças Profissionais' : 'Tabela de Avaliação de Incapacidades Permanentes em Direito Civil'}
                            </button>
                            <div className={`dropdown-content submenu`}>
                                <a>{renderTabela(item, level + 1)}</a>
                            </div>
                            </div>
                        </div>)
                    ) : (
                        <p>Dados ainda estão sendo carregados...</p>
                    )}
                </div> 
            </div>
            <Footer />
        </div>
    )
}

export default Tabela;