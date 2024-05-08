var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MedicamentoSchema = new Schema({
    substanciaAtiva: String,
    nomeDoMedicamento: String,
    formaFarmaceutica: String,
    dosagem: String,
    titularDeAIM: String,
    generico: String,
    estadoDaAIM: String,
    comercializacao: String
});

module.exports = mongoose.model("Medicamento", MedicamentoSchema);
