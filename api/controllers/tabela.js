let TabelaSchema = require('../models/tabela');

// function searchById(tabelas, targetId) {
//   let result = [];
//   for (let i = 0; i < tabelas.length; i++) {
//     let data = tabelas[i].Tabela;
//     for (const key in data) {
//       let item = data[key]
//       if (item.id === targetId || item.desc.toLowerCase().includes(targetId)) {
//         if (item.refs) {
//           item.sub = []
//           item.refs.forEach(element => {
//             console.log('element', element)
//             let newSub = searchById(tabelas, element.trim())
//             if (newSub) {
//               console.log('newSub', newSub)
//             }
//             item.sub.push(newSub)
//           });
//         }
//         result.push(item)
//         break;
//       } else if (item.sub) {
//         let subResults = searchById([{'Tabela' : item.sub}], targetId)
//         result.push(...subResults)
//       }

//     }

//   }
//   return result;
// }

function searchById(tabela, targetId) {
  // let results = []

  let ids = targetId.split('.').filter(id => id !== '');
  ids = ids.map(id => parseInt(id) - 1);
  // ids.unshift(i);
  console.log('ids', ids)

  let tempResult = tabela;
  for (let j = 0; j < ids.length; j++) {
    const index = parseInt(ids[j]);
    // if (j === 0) {
    //   tempResult = tempResult[index]['Tabela'];
    //   console.log('nivel 1', tempResult)
    // } else 
    if (j < ids.length - 1) {
      // console.log('temp result index', j, tempResult[index])
      tempResult = tempResult[index]['sub'];
      console.log('nivel intermedio', tempResult)
    } else {
      tempResult = tempResult[index];
      console.log('nivel ultimo', tempResult)

    }
    if (!tempResult) break;
  }

  // console.log('temp result', tempResult);

  // if (tempResult) {
  //   results.push(tempResult);
  // }

  return tempResult;
}

function searchByText(tabelas, targetId) {
  let results = [];

  for (let i = 0; i < tabelas.length; i++) {
    let data = tabelas[i].Tabela;
    // let result = []; // Definir result dentro do loop para criar uma nova instância em cada iteração

    if (targetId.match(/^\d+(\.\d+)*\.$/)) {
      
      console.log('match do id')
      if (searchById(data, targetId, i)) {
        results.push(searchById(data, targetId));
      }
      
    } else {
      for (const key in data) {
        let item = data[key];
        if (item.desc && item.desc.toLowerCase().includes(targetId)) {
          results.push(item);
        } else if (item.sub) {
          let subResults = searchByText([{'Tabela' : item.sub}], targetId);
          if (subResults && subResults.length > 0) {
            results.push(...subResults);
          }
        } 
      }
    }
  }

  results = removeRefs(results, tabelas[0].Tabela)

  return results;
}


// function searchById(tabelas, targetId) {
//   let result = [];
//   console.log('targetid', targetId)
//   for (let i = 0; i < tabelas.length; i++) {
//     console.log('entrou primeiro for')
//     let data = tabelas[i].Tabela;
//     console.log('data', data)
//     for (const key in data) {
//       console.log('entrou segundo for')
//       let item = data[key]
//       console.log('item', item)
//       if (targetId.match(/^[0-9.]+$/)) {
//         console.log('deu match', targetId)
//         if (targetId.includes(item.id)) {
//           if (item.id === targetId) {
//             console.log("Item encontrado id:", item);
//             result.push(item)
//           } else if (item.sub) {
//             let subResults = searchById([{'Tabela' : item.sub}], targetId)
//             console.log("Subresultados id:", subResults);
//             result.push(...subResults)
//           }
//         }
//       } else {
//         if (item.desc.toLowerCase().includes(targetId)) {
//           console.log("Item encontrado desc:", item);
//           result.push(item)
//         } else if (item.sub) {
//           let subResults = searchById([{'Tabela' : item.sub}], targetId)
//           console.log("Subresultados desc:", subResults);
//           result.push(...subResults)
//         }
//       }
//     }

//     if (result.length > 0) {
//       result = removeRefs(result, data);
//     }
//   }

//   return result;
// }

function removeRefs(result, data) {
  let newResult = [...result];
  // console.log('data refs', data)

  for (const key in newResult) {
    let item = newResult[key]
    if (item.refs) {
      console.log('item', item)
      const subArray = [];
      item.refs.forEach(element => {
        if (/^[0-9.]+$/.test(element)) {
          console.log('element', element)
          let newSub = searchById(data, element);
          // console.log('newsub', newSub)
          if (newSub) {
            console.log('newsub', newSub)
            subArray.push(newSub);
          }
        }
      });
      console.log('subarray', subArray)
      if (subArray.length > 0) {
        item.sub = subArray;
        delete item.refs
      }
      
    } else {
      if (item.sub) {
        item.sub = removeRefs(item.sub, data)
      }
    }

    newResult[key] = item;
  }

  return newResult;
}

module.exports.listTabela = async () => {
    try {
      let tabela = await TabelaSchema.find({});
      let result = tabela.map(item => item.Tabela);

      return {success: true, response: result};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
  };

module.exports.findTabelaByID = async (targetId) => {
  let noRefsResult;
  try {
    let tabela = await TabelaSchema.find({});
    if (tabela) {
      result = searchByText(tabela, targetId);
      if (result) {
          // noRefsResult = removeRefs(result, tabela)
          return { exists: true, response: result };
        }
      }
    return { exists: false, response: null };
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}