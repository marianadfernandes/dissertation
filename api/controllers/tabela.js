let TabelaSchema = require('../models/tabela');

function searchById(tabelas, targetId) {
  let result = [];
  for (let i = 0; i < tabelas.length; i++) {
    let data = tabelas[i].Tabela;

    for (const key in data) {
      if (data[key].id === targetId || data[key].desc.toLowerCase().includes(targetId)) {
        result.push(data[key]);
        continue;
      }
      // Se já tiver pai, não vai aos filhos
      if (data[key].sub) {
        if (result.length === 0) {
          let subResult = searchById([{ Tabela: data[key].sub }], targetId);
          result.push(...subResult);
        }
      }
    }
  }

  // for (const key in data){
  //   // Se tiver refs
  //   if (data[key].refs && !data[key].sub) {
  //     data[key]['sub'] = [];
  //     console.log('data key id', data[key].id);
  //     data[key].refs.forEach(element => {
  //       console.log('element', element);
  //       let refElement = searchById(TabelaSchema.find({}),element);
  //       if (refElement) {
  //         data[key]['sub'].push(refElement);
  //       }
  //     });
  //   }
  // }
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