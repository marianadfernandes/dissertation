import { React, useState, useEffect } from "react";
import axios from "axios";


import Header from "./header";
import Footer from "./footer";

function Medicamentos () {

    const [medicamento, setMedicamento] = useState(''); // Estado para armazenar o valor do medicamento
    const [informacoes, setInformacoes] = useState(''); // Estado para armazenar as informações da pesquisa


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Construa a URL com o valor do medicamento como parâmetro de pesquisa
            const url = `http://localhost:3001/scrape?fieldValue=${medicamento}`;
    
            // Faça a solicitação GET para o endpoint com o valor do medicamento como parâmetro de pesquisa
            const response = await axios.get(url);
    
            // Atualize o estado com os dados da resposta
            setInformacoes(response.data);
        } catch (error) {
            console.error('Erro ao fazer a solicitação:', error);
        } event.preventDefault();
    
      };

    return (
        <div>

            <Header></Header>

            <main>
            <div className="medicacao">
                <div className="container">
                    <div className="row">
                        <form className="form-inline" onSubmit={handleSubmit}>
                            <input
                                className="form-control mr-lg-2"
                                type="text"
                                value={medicamento}
                                onChange={(event) => setMedicamento(event.target.value)}
                                placeholder="Insira o medicamento"
                            />
                            <button className="btn-2" type="submit">Buscar</button>
                        </form>
                        <div>
                            <h6>Informações:</h6>
                            <pre>{informacoes}</pre>
                        </div>
                    </div>
                </div>
            </div>
            </main>

            <Footer></Footer>
        </div>
    );
}

export default Medicamentos;