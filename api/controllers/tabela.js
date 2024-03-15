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

function searchById(tabelas, targetId) {
  let result = [];
  for (let i = 0; i < tabelas.length; i++) {
    let data = tabelas[i].Tabela;
    for (const key in data) {
      let item = data[key]
      if (targetId.match(/^[0-9.]+$/)) {
        if (targetId.includes(item.id)) {
          if (item.id === targetId) {
            result.push(item)
          } else if (item.sub) {
            let subResults = searchById([{'Tabela' : item.sub}], targetId)
            result.push(...subResults)
          }
        }
      } else {
        if (item.desc.toLowerCase().includes(targetId)) {
          result.push(item)
        } else if (item.sub) {
          let subResults = searchById([{'Tabela' : item.sub}], targetId)
          result.push(...subResults)
        }
      }
    }
  }
  
  if (result.length > 0) {
    removeRefs(result, tabelas)
  }

  return result;
}

function removeRefs(result, data) {
  let newResult = result;

  for (const key in newResult) {
    let item = newResult[key]
    if (item.refs) {
      item.refs.forEach(element => {
        let newSub = searchById(data, element)
        item.sub = newSub
      });
      delete item.refs
    } else {
      if (item.sub) {
        removeRefs(item.sub, data)
      }
    }
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
  try {
    let tabela = await TabelaSchema.find({});
    if (tabela) {
      result = searchById(tabela, targetId);
      if (result) {
          return { exists: true, response: result };
        }
      }
    return { exists: false, response: null };
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}