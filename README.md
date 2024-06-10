# Projeto de Dissertação: Engenharia Biomédica - Informática Médica

## Organização do Projeto

### Backend
- Desenvolvido em Node.js e Express.js.
- Arquitetura MVC (Model-View-Controller).
- Mongoose para ligação à base de dados.
- Routes:
	- **tabela.js** - funções get para listar o conteúdo da tabela e para procurar na tabela por id.
- Models:
	- **tabela.js** - schema das tabelas presentes na base de dados.
- Controllers:
	- **tabela.js** - funções para listar o conteúdo da tabela, substuituir as referências pelo valor correspondente e para procurar na tabela por id.

### Frontend
- Desenvolvido em React.js.
- Routes:
	- **HomePage** ("/") - página inicial da aplicação com cards correspondentes a "serviços" (funcionalidades) presentes na aplicação.
	- **Tabela** ("/tabela") - página com apresentação dos dados presentes nas tabelas com dropdowns.
	- **Avaliação** ("/avaliacao") - página com barra de pesquisa para as tabelas. 
		- <u>Regras de funcionamento:</u>
			- Botões que tenham valor (botão presente numa camada final) e que estejam com submenu aberto encontram-se selecionados.
			- Não pode haver mais que um elemento da mesma camada final selecionado. 
			- Alguns botões da camada final podem conter referência em vez de valor. Se for referência única com correspondência a (intervalo de) valor(es), irá ser procurado o valor correspondente à(s) mesma(s). 
			- Por baixo dos resultados, encontram-se informações sobre os botões que estão selecionados. Cada seleção, tem associada um slider com valores mínimos e máximos correspondentes ao intervalo de valor respetivo. É possível escolher um valor nesse intervalor. 
			- No canto inferior direito, vê-se uma caixa com a soma dos coeficientes selecionados (menor ou igual 1).
	- **Corpo** ("/utente") -  página com modelo do corpo humano onde é possível clicar nas várias partes do corpo. A cada parte estão associadas as entradas da Tabela Nacional de Incapacidades correspondentes. 
	- **Pesquisa de Medicamentos** ("/medicamentos/pesquisa") - página com barra de pesquisa para procura de medicamento por nome comercial e dosagem. Apenas é possível a seleção de um medicamento por pesquisa.
	- **Seleção de Doenças** ("/medicamentos/doenças") - Na sequência da seleção de medicamentos, a página seguinte apresenta todos os medicamentos selecionados e permite selecionar as doenças que a pessoa tem/sofre relacionado com o medicamento selecionado.
- Componentes:
	- **header.js** - header de todas as páginas da aplicação, com barra de navegação.
	- **footer.js** - footer de todas as páginas da aplicação.
	- **homepage.js** - componente correspondente aos elementos da página principal, incluindo ligação às funcionalidades da aplicação.
	- **tabela.js** - componente correspondente à apresentação dos dados presentes nas tabelas.
	- **avaliacao.js** - componente correspondente à ferramenta para cálculo do dano corporal, com pesquisa na tabela, seleção dos danos, escolha do valor por ramo e soma final.
	- **menbody.js**
	- **pesquisa_medicamentos.js**
	- **selecao_doenças.js**