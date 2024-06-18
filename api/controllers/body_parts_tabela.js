let BodyPartsSchema = require('../models/body_parts_tabela');

module.exports.listBodyParts = async (req, res) => {
    try {
        const query = 'SELECT * FROM corpo'; 
        const result = await req.client.query(query);
        return { success: true, response: result.rows };
      } catch (err) {
        console.error('Error fetching body parts:', err);
        return { success: false, response: err };
      }
};

module.exports.findByBodyPart = async (req, res, bodypart) => {
    try {
        const query = 'SELECT t1, t2 FROM corpo WHERE body_part = $1';
        const result = await req.client.query(query, [bodypart]);
        
        if (result.rows.length > 0) {
          return { exists: true, response: result.rows[0] };
        }
        return { exists: false, response: null };
      } catch (err) {
        console.error('Error fetching body part by ID:', err);
        return { exists: false, response: err };
      }
};
  