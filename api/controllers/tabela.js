let TabelaSchema = require('../models/tabela');

function searchById(tabela, targetId, tabelaID) {
  let results = [];
  let tabid = null;

  if (tabelaID) {
    let tabid = tabelaID[1];
    // console.log('tab id', tabid)
    tabela = [tabela[tabid - 1]]
    // console.log('new tab', tabela)
  }

  for (let i = 0; i < tabela.length; i++) {
    const currentTable = tabela[i];
    // console.log('current', currentTable);
    // for (let i = 0; i < currentTable.length; i++) {

    // Separar o id por pontos
    let ids = targetId.split('.').filter(id => id !== '');
    // Retirar 1 a cada valor
    ids = ids.map(id => parseInt(id) - 1);
  
    // Acrescentar o número da tabela
    if (tabid !== null) {
      ids.unshift(tabid - 1)
    } else {
      ids.unshift(i);
    }

    // console.log('id', ids)

    // Percorrer os ids 
    for (let j = 0; j < ids.length; j++) {
      const index = parseInt(ids[j]);
      // console.log('j', j, 'index', index)
      if (j === 0) {
        tempResult = currentTable['Tabela'];
        // console.log('tempresult', tempResult);
      } else if (j < ids.length - 1) {
        // console.log('j', j, 'index', index)
        if (!tempResult[index] || !tempResult[index]['sub']) {
          break; // Se não houver 'sub', retornar null imediatamente
        }
        tempResult = tempResult[index]['sub'];
        // console.log('tempresult', tempResult);
      } else {
        // console.log('j', j, 'index', index)
        tempResult = tempResult[index];
        // console.log('tempresult', tempResult);
      }
      if (!tempResult) break;
    }
    if (tempResult) {
      results.push(tempResult);
    }
  // }
}

  return results;
}

function searchByText(tabelas, targetId) {
  let results = [];

  for (let i = 0; i < tabelas.length; i++) {
    let data = tabelas[i].Tabela;
    for (const key in data) {
      let item = data[key];
      if (item.desc && item.desc.toLowerCase().includes(targetId)) {
        results.push(item);
        // console.log('item a dar push', item)
      } else if (item.sub) {
        let subResults = searchByText([{'Tabela' : item.sub}], targetId);
        if (subResults && subResults.length > 0) {
          results.push(...subResults);
          // console.log('subresult a dar push', subResults)

        }
      } 
    }
  }

  return results;
}

function removeRefs(result, data) {
  let newResult = [...result];
  // console.log('data refs', data)

  for (const key in newResult) {
    let item = newResult[key]
    if (item.refs) {
      // console.log('item', item)
      const subArray = [];
      item.refs.forEach(element => {
        if (/^[0-9.]+$/.test(element)) {
          // console.log('element', element)
          let newSub = searchById([{'Tabela' : data}], element);
          // console.log('newsub', newSub)
          if (newSub) {
            subArray.push(newSub);
          }
        }
      });
      if (subArray.length > 0) {
        item.sub = subArray.flatMap(sub => sub);
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
      let tabela = await TabelaSchema.find({ Tabela: { $exists: true } });

      let result = tabela.map(item => item.Tabela);
    
      return {success: true, response: tabela};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
  };

module.exports.findTabelaByID = async (targetId, tabelaID) => {
  console.log('targetid', targetId);
  console.log('tabelaid', tabelaID)
  let noRefsResult;
  try {

    let tabela = await TabelaSchema.find({ Tabela: { $exists: true } });

    // if (tabelaID) {
    //   if (tabelaID === 'T1') {
    //     console.log('entrei', tabelaID);
    //     tabela = tabela[0]
    //     console.log('tabela 0', tabela)
    //   } else if (tabelaID === 'T2') {
    //     console.log('entrei', tabelaID);
    //     tabela = tabela[1]
    //     console.log('tabela 1', tabela)
    //   } else {
    //     throw new Error('Invalid ID format');
    //   }
    // } else {
    //   console.log('não entrei');
    //   tabela = tabela
    //   console.log('tabelas', tabela)
    // }
    
    if (tabela) {
      if (targetId.match(/^\d+(\.\d+)*\.$/)) {
        // console.log('tabela que entra', tabela)
        result = searchById(tabela, targetId, tabelaID);
      } else {
        result = searchByText(tabela, targetId);
      }
      
      if (result) {
        if (tabelaID && tabelaID === 'T2') {
          return { exists: true, response: result };
        } else {
          noRefsResult = removeRefs(result, tabela[0].Tabela);
          return { exists: true, response: noRefsResult };
        }
        }
      }
    return { exists: false, response: null };
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}