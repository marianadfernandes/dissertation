// Router

const express = require('express');
const router = express.Router();
const scrapingController = require('../controllers/scrape'); // Importe o controlador de scraping

// Defina a rota para a funcionalidade de scraping
router.get("/scrape/", async (req, res) => {
    // let nome_med = req.params.nome_med;
    const scrapeResponse = await scrapingController.scrape();
    console.log(scrapeResponse);
    res.status(200).json(scrapeResponse.response);
  });

module.exports = router;
