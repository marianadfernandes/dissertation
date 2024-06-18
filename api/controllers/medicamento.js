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

module.exports.findByID = async (req, res, med, dos) => {
    console.log('Received parameters:', med, dos); 

    try {
        const query = `
        SELECT * FROM medicamentos 
        WHERE nome ILIKE '%' || $1 || '%'
        AND dosagem ILIKE '%' || $2 || '%'
      `;
      const values = [med, dos];
      
      const result = await req.client.query(query, values);
  
      if (result.rows.length > 0) {
        return { success: true, response: result.rows };
      } else {
        return { success: false, response: 'No matching entries found' };
      }
    } catch (err) {
      console.error('Error fetching data from PostgreSQL:', err);
      return { success: false, response: err };
    }
};