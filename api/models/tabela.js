var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TabelaSchema = new Schema({
  Tabela: {type: Schema.Types.Mixed},
});

module.exports = mongoose.model("Tabela", TabelaSchema);