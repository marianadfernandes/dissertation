var express = require("express");
var router = express.Router();
var medicamentoController = require("../controllers/medicamento");

router.get("/listMedicamentos", async (req, res) => {
  const tabelaResponse = await medicamentoController.listMedicamentos();
  console.log(tabelaResponse);
  res.status(200).json(tabelaResponse.response);
});

router.get("/search/:medicamento/:dosagem", async (req, res) => {
  let med = req.params.medicamento;
  let dos = req.params.dosagem;
  const tabelaResponse = await medicamentoController.findByID(med, dos);
  console.log(tabelaResponse);
  // if (tabelaResposnse && tabelaResponse.response) {
  res.status(200).json(tabelaResponse.response);
  // } else {
  //   res.status(404).json({ error: 'ID not found' });
  // }
})

module.exports = router;