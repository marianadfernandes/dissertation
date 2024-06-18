var express = require("express");
var router = express.Router();
var tabelaController = require("../controllers/tabela.js");

router.get('/listTabela', async (req, res) => {
  try {
    const tabelaResponse = await tabelaController.listTabela(req, res); // Passando req como argumento
    console.log(tabelaResponse);
    res.status(200).json(tabelaResponse.response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get('/search/:input', async (req, res) => {
  let input = req.params.input;

  try {
    const tabelaResponse = await tabelaController.findEntriesByText(req, res, input);
    console.log(tabelaResponse);
    res.status(200).json(tabelaResponse.response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get("/search/:id/:tabela", async (req, res) => {
  let id = req.params.id;
  let tabid = req.params.tabela;

  try {
    const tabelaResponse = await tabelaController.findEntriesByID(req, id, tabid.charAt(1));
    if (tabelaResponse.exists) {
      res.status(200).json(tabelaResponse.response);
    } else {
      res.status(404).json({ error: 'ID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


module.exports = router;
