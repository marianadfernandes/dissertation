var express = require("express");
var router = express.Router();
var tabelaController = require("../controllers/tabela.js");

router.get("/listTabela", async (req, res) => {
  const tabelaResponse = await tabelaController.listTabela();
  console.log(tabelaResponse);
  res.status(200).json(tabelaResponse.response);
});


router.get("/search/:id/:tabela?", async (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  let tabid = req.params.tabela;
  // console.log(req.params.id);
  // console.log(id);
  const tabelaResponse = await tabelaController.findTabelaByID(id, tabid);
  console.log(tabelaResponse);
  // if (tabelaResponse && tabelaResponse.response) {
  res.status(200).json(tabelaResponse.response);
  // } else {
  //   res.status(404).json({ error: 'ID not found' });
  // }
})

module.exports = router;
