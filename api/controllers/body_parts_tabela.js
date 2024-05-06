let BodyPartsSchema = require('../models/body_parts_tabela');

module.exports.listBodyParts = async () => {
    try {
        const data = await BodyPartsSchema.find({ Tabela: { $exists: false } }); // Buscando todos os documentos
        return { success: true, response: data };
    } catch (err) {
        console.error(err);
        return { success: false, response: err };
    }
};

module.exports.findByID = async (bodypart) => {
    try {
        console.log('Parte do corpo', bodypart);
        let result = await BodyPartsSchema.find({});
        console.log('Resultado da consulta:', result);
        // console.log('Resultado cabeça', result[0].head)

        const filteredResult = result[0][bodypart];
        console.log('Resultado filtrado:', filteredResult);
        
        if (filteredResult) {
            return { exists: true, response: filteredResult };
        }
        return { exists: false, response: null };

    } catch (err) {
        console.log(err);
        return {exists: false, response: err};
    }
};
  