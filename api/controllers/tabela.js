let TabelaSchema = require('../models/tabela');

function searchById(json, targetId) {

  let results = [];

  // Verificar se o json está no formato correto
  if (!json || !Array.isArray(json) || !json[0] || !json[0].Tabela) {
    return null;
  }

  let tabela = json[0].Tabela;

  // Separar o id por pontos e retirar 1 de cada valor
  let ids = targetId.split('.').filter(id => id !== '').map(id => parseInt(id) - 1);

  let tempResult = tabela;

  for (let idx = 0; idx < ids.length; idx++) {
    const tab_index = ids[idx];

    // Verifica se o índice é o último no caminho
    if (idx < ids.length - 1) {
      // Verifica se 'sub' existe no objeto atual
      if (!tempResult[tab_index] || !tempResult[tab_index]['sub']) {
        return null;
      }

      // Avança para o próximo nível do objeto
      tempResult = tempResult[tab_index]['sub'];
    } else {
      // Último índice, acessa diretamente o objeto
      if (!tempResult[tab_index]) {
        return null;
      }
      tempResult = tempResult[tab_index];
    }
  }

  if (tempResult) {
    results.push(tempResult)
  }

  return results;
}


function searchByText(tabelas, input) {
  let results = [];

  for (let i = 0; i < tabelas.length; i++) {
    let data = tabelas[i].arquivo_json;

    for (let j = 0; j < data.length; j++) {
      const tabela = data[j].Tabela;

      for (const key in tabela) {
        let item = tabela[key];
        if (item.desc && item.desc.toLowerCase().includes(input)) {
          results.push(item);
        } else if (item.sub) {
          let subResults = searchByText([{'arquivo_json': [{'Tabela' : item.sub}] }], input);
          if (subResults && subResults.length > 0) {
            results.push(...subResults);
          }
        } 
      }
    }
  }

  return results;
}

function removeRefs(result, data) {
  let newResult = [...result];
  console.log('data refs', data)

  for (const key in newResult) {
    let item = newResult[key]
    // console.log('item', item)
    if (item.refs) {
      console.log('item c/ refs', item)
      const subArray = [];
      item.refs.forEach(element => {
        if (/^[0-9.]+$/.test(element)) {
          console.log('element', element)
          let newSub = searchById(data, element);
          console.log('newsub', newSub)
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


// ---------------------------- //


module.exports.listTabela = async (req, res) => {
  try {
    const query = 'SELECT * FROM tabelas;';
    const result = await req.client.query(query);
    return { success: true, response: result.rows };
  } catch (error) {
    console.error('Error fetching data from PostgreSQL', error);
    return { success: false, response: error };
  }
};

module.exports.findEntriesByText = async (req, res, input) => {
  let noRefsResult;
  try {

    const query = 'SELECT * FROM tabelas;';
    const tabelas = await req.client.query(query);
    
    if (tabelas) {
      result = searchByText(tabelas.rows, input);
    }
    
    if (result) {
      noRefsResult = removeRefs(result, tabelas.rows[0].arquivo_json);
      return { exists: true, response: noRefsResult };
    }
      
    return { exists: false, response: null };
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}

module.exports.findEntriesByID = async (req, id, tabid) => {

  try {
    const query = 'SELECT arquivo_json FROM tabelas WHERE id = $1;';
    const values = [tabid];
    
    const result = await req.client.query(query, values);

    if (result.rows.length > 0) {
      const tabela = result.rows[0].arquivo_json;
      const searchResult = searchById(tabela, id);

      if (searchResult) {
        noRefsResult = removeRefs(searchResult, tabela[0].Tabela);
        if (noRefsResult) {
          return { exists: true, response: searchResult };
        }
        return { exists: false, response: null };
      }
    }
      
    return { exists: false, response: null };
  } catch (err) {
    console.log(err);
    return { exists: false, response: err };
  }
};