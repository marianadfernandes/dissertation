import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-dropdown-select';


// function renderTabelaRecursive(tabela) {
//   return (
//     <div>
//       {tabela && Object.keys(tabela).map((key) => (
//           <div key={key}>
//             <h6>{tabela[key]['id']} {tabela[key]['desc']}</h6>
//             {tabela[key]['nota'] ? (
//               <p>Nota: {tabela[key]['nota']}</p>
//             ) : (
//               <></>
//             )
//             }
//             {tabela[key]['valor'] ? (
//               <p>Valor: {tabela[key]['valor']}</p>
//             ) : (
//               <></>
//             )
//             }
//             {tabela[key]['refs'] ? (
//               <p>Referência a: {tabela[key]['refs']}</p>
//             ) : (
//               <></>
//             )
//             }
//             <div>
//               {renderTabelaRecursive(tabela[key]['sub'])}
//             </div>
//           </div>
//       ))}
//       </div>
//   );
// }

// function renderTabela(tabela) {
//     if (!tabela || !tabela[0] || !tabela[0].Tabela) {
//       return <p>Dados ainda estão sendo carregados...</p>;
//     }
  
//     return (
//       <div>
//         {Object.keys(tabela[0].Tabela).map((key) => (
//           <div key={key}>
//                 <h3>Capítulo {tabela[0].Tabela[key]['id']}: {tabela[0].Tabela[key]['desc']}</h3>
//                 <hr></hr>
//                 <div>
//                   {renderTabelaRecursive(tabela[0].Tabela[key]['sub'])}
//                 </div>
//               <hr></hr>
//             </div>
//           ))}
//         </div>
// );
//   }

function toggleSubItems(e) {
  const subItems = e.target.nextElementSibling;
  const parentDropdown = e.target.parentElement;
  console.log(parentDropdown);
  console.log(subItems);

  if (subItems.style.display === 'block') {
    subItems.style.display = 'none';
    parentDropdown.style.height = 'auto'; // Restaura a altura original
  } else {
    subItems.style.display = 'block';
    parentDropdown.style.height = parentDropdown.style.height + subItems.style.height + 'px'; // Ajustar a altura
  }
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('dropbtn')) {
    toggleSubItems(e);
  }
});


function renderTabela(tabela, level) {
  return (
    <div className={`dropdown-levels dropdown-level-${level}`}>
      {Object.keys(tabela).map((key) => (
        <div className={`dropdown`}>
          <button className="dropbtn">
            {tabela[key]['id']} {tabela[key]['desc']}
          </button>
          <div className={`dropdown-content submenu`}>
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



function Tabela() {

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

//   console.log(tabela[0].Tabela)

 
  return (
    !tabela || !tabela[0] || !tabela[0].Tabela ? (
      <p>Dados ainda estão sendo carregados...</p>
    ) : (
      renderTabela(tabela[0].Tabela, level)
    )
  );
}

export default Tabela;
