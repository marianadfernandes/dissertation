var express = require("express");
var router = express.Router();
var bodyPartsController = require("../controllers/body_parts_tabela.js");

router.get("/listTabela", async (req, res) => {
  const tabelaResponse = await bodyPartsController.listBodyParts();
  console.log(tabelaResponse);
  res.status(200).json(tabelaResponse.response);
});

router.get("/search/:id", async (req, res) => {
  let id = req.params.id;
  // console.log(req.params.id);
  // console.log(id);
  const tabelaResponse = await bodyPartsController.findByID(id);
  console.log(tabelaResponse);
  // if (tabelaResponse && tabelaResponse.response) {
  res.status(200).json(tabelaResponse.response);
  // } else {
  //   res.status(404).json({ error: 'ID not found' });
  // }
})

module.exports = router;