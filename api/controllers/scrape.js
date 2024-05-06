// Controller

const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports.scrape = async () => {
  try {
    // console.log('nome_mde', nome_med)
    // const { fieldValue } = nome_med; // Obtenha o novo valor do campo de pesquisa da solicitação
    // console.log('fieldvalue', fieldValue)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Construa o URL com o novo valor do campo de pesquisa
    const url = `https://extranet.infarmed.pt/INFOMED-fo/pesquisa-avancada.xhtml`;
    console.log('url', url)
    await page.goto(url);
    // Realize o scraping aqui
    const content = await page.content();
    await browser.close();
    return {success: true, response: content};
  } catch (error) {
    console.error('Erro ao fazer scraping:', error);
    return {success: false, response: error};
  }
};
