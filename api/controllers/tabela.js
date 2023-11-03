let TabelaSchema = require('../models/tabela');

function searchById(data, targetId) {
  const result = [];
  for (const key in data) {
    if (data[key].id == targetId || data[key].desc.toLowerCase().includes(targetId)) {
      result.push(data[key]);
    }
    if (data[key].sub) {
      const subResult = searchById(data[key].sub, targetId);
      result.push(...subResult);
    }
  }
  return result;
};

module.exports.listTabela = async () => {
    try {
      let tabela = await TabelaSchema.find({});
      console.log(tabela);
      return {success: true, response: tabela};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
  };

  module.exports.findTabelaByID = async (targetId) => {
    try {
      let tabela = await TabelaSchema.find({});
      if (tabela[0] && tabela[0].Tabela) {
        result = searchById(tabela[0].Tabela, targetId);
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