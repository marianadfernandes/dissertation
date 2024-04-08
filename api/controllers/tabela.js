let TabelaSchema = require('../models/tabela');

function searchById(tabela, targetId) {
  let results = [];

  for (let i = 0; i < tabela.length; i++) {
    // Separar o id por pontos
    let ids = targetId.split('.').filter(id => id !== '');
    // Retirar 1 a cada valor
    ids = ids.map(id => parseInt(id) - 1);
    // Acrescentar o número da tabela
    ids.unshift(i);

    // Percorrer os ids 
    let tempResult = tabela;
    for (let j = 0; j < ids.length; j++) {
      const index = parseInt(ids[j]);
      if (j === 0) {
        tempResult = tempResult[index]['Tabela'];
      } else if (j < ids.length - 1) {
        if (!tempResult[index] || !tempResult[index]['sub']) {
          break; // Se não houver 'sub', retornar null imediatamente
        }
        tempResult = tempResult[index]['sub'];
      } else {
        tempResult = tempResult[index];
      }
      if (!tempResult) break;
    }
    if (tempResult) {
      results.push(tempResult);
    }
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
      } else if (item.sub) {
        let subResults = searchByText([{'Tabela' : item.sub}], targetId);
        if (subResults && subResults.length > 0) {
          results.push(...subResults);
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
      console.log('item', item)
      const subArray = [];
      item.refs.forEach(element => {
        if (/^[0-9.]+$/.test(element)) {
          console.log('element', element)
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
      if (targetId.match(/^\d+(\.\d+)*\.$/)) {
        result = searchById(tabela, targetId);
      } else {
        result = searchByText(tabela, targetId);
      }
      if (result) {
          noRefsResult = removeRefs(result, tabela[0].Tabela);
          return { exists: true, response: noRefsResult };
        }
      }
    return { exists: false, response: null };
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}