let TabelaSchema = require('../models/tabela');

function searchById(tabelas, targetId) {
  const result = [];
  for (let i = 0; i < tabelas.length; i++) {
    const data = tabelas[i].Tabela;

    for (const key in data) {
      if (data[key].id === targetId || data[key].desc.toLowerCase().includes(targetId)) {
        result.push(data[key]);
      }
      if (data[key].sub) {
        if (result.length === 0) {
          const subResult = searchById([{ Tabela: data[key].sub }], targetId);
          result.push(...subResult);
        }
      }
    }
  }
  return result;
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