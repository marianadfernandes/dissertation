var express = require("express");
var router = express.Router();
var bodyPartsController = require("../controllers/body_parts_tabela.js");

router.get("/listTabela", async (req, res) => {
  const tabelaResponse = await bodyPartsController.listBodyParts();
  console.log(tabelaResponse);
  res.status(200).json(tabelaResponse.response);
});

router.get("/search/:id", async (req, res) => {
  let body_part = req.params.id;

  const tabelaResponse = await bodyPartsController.findByBodyPart(req, res, body_part);
  console.log(tabelaResponse);
  res.status(200).json(tabelaResponse.response);

})

module.exports = router;