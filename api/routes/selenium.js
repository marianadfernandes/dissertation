const express = require('express');
const router = express.Router();
const scrapingController = require('../controllers/selemium'); // Importe o controlador de scraping

// Defina a rota para a funcionalidade de scraping
router.get("/:nome_med", async (req, res) => {
    let nome_med = req.params.nome_med;
    const scrapeResponse = await scrapingController.processarFormulario(nome_med);
    console.log(scrapeResponse);
    res.status(200).json(scrapeResponse.response);
  });

module.exports = router;