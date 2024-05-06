// Importar o Selenium WebDriver
const { Builder, By, until } = require('selenium-webdriver');

module.exports.processarFormulario = async (nome_med) => {
    try {
        // Inicializar o navegador
        let driver = await new Builder().forBrowser('chrome').build();

        // Abrir a página da web
        await driver.get('https://extranet.infarmed.pt/INFOMED-fo/pesquisa-avancada.xhtml');

        // Preencher o campo do formulário com o nome do medicamento
        let campoInput = await driver.findElement(By.id('mainForm:dci_input'));
        await campoInput.sendKeys(nome_med);

        // Selecionar a opção na combobox
        let combobox = await driver.findElement(By.id('mainForm:combobox'));
        await combobox.findElement(By.css("option[value='REF_EST_COMERC:001']")).click();

        // Enviar o formulário
        let botaoEnviar = await driver.findElement(By.id('mainForm:botao_enviar'));
        await botaoEnviar.click();

        // Esperar pelo resultado
        let resultado = await driver.wait(until.elementLocated(By.id('id_do_elemento_do_resultado')), 5000);

        // Extrair o conteúdo da resposta
        let content = await resultado.getText();

        // Fechar o navegador
        await driver.quit();

        return { success: true, response: content };
    } catch (error) {
        console.error('Erro:', error);
        return { success: false, response: error.message };
    }
};

