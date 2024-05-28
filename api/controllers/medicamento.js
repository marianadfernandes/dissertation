let MedicamentoSchema = require('../models/medicamento');

module.exports.listMedicamentos = async () => {
    try {
        const data = await MedicamentoSchema.find(); // Buscando todos os documentos
        return { success: true, response: data };
    } catch (err) {
        console.error(err);
        return { success: false, response: err };
    }
};

module.exports.findByID = async (med, dos) => {
    console.log(med);
    try {
        if (med.includes(' ')) {
            // Tenta buscar com o medicamento exatamente como está
            result = await MedicamentoSchema.find({ "Nome do Medicamento": { $regex: med, $options: 'i' }, "Dosagem": { $regex: dos, $options: 'i' }});
            
            // Se não encontrar resultados, tenta buscar com as palavras separadas por espaço
            if (result.length === 0) {
                const [word1, word2] = med.split(' ');
                const medWithSpace = `${word1} + ${word2}`;
                result = await MedicamentoSchema.find({ "Nome do Medicamento": { $regex: medWithSpace, $options: 'i' }, "Dosagem": { $regex: dos, $options: 'i' }});
            }
        } else {
            // Se o medicamento tiver apenas uma palavra, busca exatamente como está
            result = await MedicamentoSchema.find({ "Nome do Medicamento": { $regex: med, $options: 'i' }, "Dosagem": { $regex: dos, $options: 'i' }});
        }
        // console.log('Resultado cabeça', result[0].head)

        // const filteredResult = result[0][bodypart];
        // console.log('Resultado filtrado:', filteredResult);
        
        if (result) {
            return { exists: true, response: result };
        }
        return { exists: false, response: null };

    } catch (err) {
        console.log(err);
        return {exists: false, response: err};
    }
};