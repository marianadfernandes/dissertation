import { React, useState, useEffect, useRef } from "react";
import axios from "axios";

import Button from "@mui/material/Button";

import Header from "./header";
import Footer from "./footer";

// function toggleSubItems(e) {
//     const subItems = e.target.nextElementSibling;
//     const parentDropdown = e.target.parentElement;
  
//     console.log('Current subItems height:', subItems.offsetHeight);
  
//     if (subItems) {
//       if (subItems.offsetHeight !== 0) {
//         console.log('Entering show condition');
//         subItems.classList.add('show');
  
//         const subItemsHeight = subItems.offsetHeight;
//         parentDropdown.style.height = `${parentDropdown.offsetHeight + subItemsHeight + 20}px`;
  
//         const allParents = getAllParents(parentDropdown, 'dropdown');
//         console.log('parents', allParents);
  
//         allParents.forEach((parent) => {
//           parent.style.height = `${parent.offsetHeight + subItemsHeight + 20}px`;
//         });
//       } else {
//         console.log('Entering hide condition');
//         subItems.classList.remove('show');
//         parentDropdown.style.height = 'auto';
  
//         // restaurar a altura dos filhos
//         Array.from(parentDropdown.children).forEach((child) => {
//           child.style.height = 'auto';
//         });
  
//         const allParents = getAllParents(parentDropdown, 'dropdown');
//         console.log('parents', allParents);
  
//         // restaura a altura dos pais
//         allParents.forEach((parent) => {
//           const childrenHeight = Array.from(parent.children)
//             .reduce((acc, child) => acc + child.offsetHeight, 0);
//           parent.style.height = `${childrenHeight + 20}px`;
//         });
//       }
//     }
//   }
  
//   // procura os elementos pai 
//   function getAllParents(element, targetClass) {
//     const parents = [];
//     let currentElement = element.parentElement;
  
//     while (currentElement) {
//       if (currentElement.classList.contains(targetClass)) {
//         parents.push(currentElement);
//       }
//       currentElement = currentElement.parentElement;
//     }
  
//     return parents;
//   }
  

  // function renderTabela(tabela, level) {
  //   return (
  //     <div className={`col-lg-12 dropdown-levels dropdown-level-${level}`}>
  //       {Object.keys(tabela).map((key) => (
  //         <div className={`dropdown`}>
  //           <Button className="dropbtn">
  //             {tabela[key]['id']} {tabela[key]['desc']}
  //           </Button>
  //           <div className={`dropdown-content submenu`}>
  //             {tabela[key]['cod'] ? <a>Código: {tabela[key]['cod']}</a> : null}
  //             {tabela[key]['nota'] ? <a>Nota: {tabela[key]['nota']}</a> : null}
  //             {tabela[key]['valor'] ? <a>Valor: {tabela[key]['valor']}</a> : null}
  //             {tabela[key]['refs'] ? <a>Referência a: {tabela[key]['refs']}</a> : null}
  //             {tabela[key]['sub'] ? (
  //               <a>{renderTabela(tabela[key]['sub'], level + 1)}</a>
  //             ) : null}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  function renderTabela(tabela, level, toggleDropdown, buttons) {
    // console.log('tabela render', tabela)
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

    const baseURL = "http://localhost:3001/tabela/listTabela";

    const [tabela, setTabela] = useState([]);
    const [buttons, setButton] = useState([]);
    const [loading, setLoading] = useState(true); 
    const level = 1;
    const listener = useRef(null);

    // listener.current.addEventListener('click', function (e) {
    //   if (e.target.classList.contains('dropbtn')) {
    //     toggleSubItems(e);
    //   }
    // });

    // useEffect(() => {
    //   const handleClick = e => {
    //     if (e.target.classList.contains('dropbtn')) {
    //       toggleSubItems(e);
    //     }
    //   }});

    //   listener.current.addEventListener('click', handleClick);

    //   return () => {
    //     listener.current.removeEventListener('click', handleClick);
    //   };
    // }, []);
  
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

  // useEffect(() => {
  //   console.log('buttons atualizado:', buttons);
  //   console.log('buttons lenght', buttons.length)
  // }, [buttons]);

  const toggleDropdown = (event, item, level) => {
    // console.log("NOVO CLIQUE");
    // console.log("item", item);
    // console.log("event", event.target)
    // console.log("next element", event.target.nextSibling);
    // console.log("level", level);

    const nextSiblingElement = event.target.nextElementSibling;
    const parent = event.target.parentNode.parentNode.parentNode.parentNode;
    // console.log('parent', parent)

    // Se o dropdown estiver fechado, abre-se
    if (nextSiblingElement.classList.contains('hidden')) {

        // Se tiver valor, acrescentar à lista de resultados clicados
        // if (item.valor) {
        //     console.log('sou um botão com valor')

            // // Filtrando o array buttons uma vez antes do loop
            // const filteredButtons = buttons.filter(item => item.hasOwnProperty('min'));
            // console.log('filteredbuttons', filteredButtons)

            // // Verificando se há botões a serem removidos
            // if (filteredButtons.length > 0) {
            //     const itemBaseId = item.id.substring(0, item.id.lastIndexOf('.', item.id.lastIndexOf('.') - 1)); // Obtém a parte do id antes do penúltimo ponto
            //     console.log('itembaseid', itemBaseId);

            //     // Criando uma cópia do array de botões para posterior atualização do estado
            //     let updatedButtons = [...buttons];

            //     // Iterando sobre os botões filtrados
            //     for (let i = 0; i < filteredButtons.length; i++) {
            //         const button = filteredButtons[i];
            //         const buttonBaseId = button.id.substring(0, button.id.lastIndexOf('.', button.id.lastIndexOf('.') - 1)); // Obtém a parte do id do botão antes do penúltimo ponto
            //         console.log('buttonbaseid', buttonBaseId);

            //         // Verificando se o id base do botão atual é o mesmo que o id base do item
            //         if (buttonBaseId === itemBaseId) {
            //             console.log('ESTOU A REMVOER este', button)
            //             // Removendo o botão do array atualizado
            //             updatedButtons = updatedButtons.filter(btn => btn.id !== button.id);
            //             console.log('updated buttons', updatedButtons);

            //             // Fechando o dropdown do botão correspondente
            //             let siblingToDelete;
            //             parent.querySelectorAll('.dropbtn').forEach(element => {
            //                 if (element.innerHTML.includes(button.desc)) {
            //                     siblingToDelete = element;
            //                 }
            //             });

            //             console.log('sibling to delete', siblingToDelete);
            //             console.log('sibling to delete next element', siblingToDelete.nextElementSibling);

            //             siblingToDelete.style.removeProperty('background-color');
            //             siblingToDelete.nextElementSibling.classList.remove('visible');
            //             siblingToDelete.nextElementSibling.classList.add('hidden');

            //             var larguraAtual = parseInt(siblingToDelete.nextElementSibling.style.width);
            //             var novaLargura = larguraAtual - 50; // Diminui a largura em 10 pixels

            //             siblingToDelete.nextElementSibling.style.width = novaLargura + "px"; // Define a nova largura
                //     }
                // }

                // Atualizando o estado com o novo array de botões
                // setButton(updatedButtons);
            // }


            // const {minCoef, maxCoef} = calculateCoefs(item.valor);
            // setButton (prevInfo => {
            //     return [...prevInfo, { id: item.id, desc: item.desc, min: minCoef, max: maxCoef, slider: minCoef}];
            // });

            
        // } else if (item.refs) {
            
        //     axios.get(`${baseURL}/${item.refs[0]}`).then((response) => {
        //         console.log(JSON.stringify(response.data));
        //         setRefsResults(response.data);
        
        //         response.data.forEach(element => {
        //             console.log('ele', element);
        //             renderTabela(element, level, toggleDropdown, buttons)
        //         });
        //     });

        // } 
        // } else {

            // setButton (prevInfo => {
            //     return [...prevInfo, { id: item.id, desc: item.desc }];
            // });

        // }

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
        // console.log('estou a remover este', item)

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
                // console.log('son to delete', element)
                // console.log('son parent', element.parentElement.querySelector('.dropbtn'))
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
            <Footer />
        </div>
    )
}

export default Tabela;