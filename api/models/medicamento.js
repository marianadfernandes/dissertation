var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MedicamentoSchema = new Schema({
    "Substância Ativa/DCI": String,
    "Nome do Medicamento": String,
    "Forma Farmacêutica": String,
    "Dosagem": String,
    "Titular de AIM": String,
    "Genérico": String,
    "Estado da AIM": String,
    "Comercialização": String,
    "Indicações Terapêuticas": String,
    "Doença(s)": Array
});

module.exports = mongoose.model("Medicamento", MedicamentoSchema);
