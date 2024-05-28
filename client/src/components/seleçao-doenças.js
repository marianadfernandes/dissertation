import { React, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import Header from "./header";
import Footer from "./footer";

function SeleçaoDoenças () {

    const location = useLocation();
    const { medicamentosSelecionados } = location.state || { medicamentosSelecionados: [] };

    const [doençaSelecionada, setDoençaSelecionada] = useState({});

    useEffect(() => {
        const inicializarDoenças = () => {
            const novasDoenças = {};
            medicamentosSelecionados.forEach(medicamento => {
                novasDoenças[medicamento['Nome do Medicamento']] = [];
            });
            console.log('Inicializando doençaSelecionada:', novasDoenças);
            setDoençaSelecionada(novasDoenças);
        };

        inicializarDoenças();
    }, [medicamentosSelecionados]);
 
    const handleChange = (event, medicamento) => {
        const value = event.target.value;
        setDoençaSelecionada(prevState => {
            const updated = {
                ...prevState,
                [medicamento]: [value] // Atualiza o array de doenças selecionadas para o medicamento
            };
            console.log('Atualizado doençaSelecionada:', updated);
            return updated;
        });
    };


    return (
        <div className="general-page">

        <Header></Header>

        <main>

        {medicamentosSelecionados.length > 0 && (
                    <div className="medicamentos-selecionados">
                        <div className="container">
                            {medicamentosSelecionados.map((medicamento, index) => (
                                <div key={index} className="result-row">
                                    <p>{medicamento['Nome do Medicamento']}</p>
                                    <p>{medicamento['Dosagem']}</p>
                                        <div className="doenças-container">
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Selecione uma doença para {medicamento['Nome do Medicamento']}</FormLabel>
                                                <RadioGroup
                                                    aria-label={`doenças-${index}`}
                                                    name={`doenças-${index}`}
                                                    value={doençaSelecionada[medicamento['Nome do Medicamento']] || ''}
                                                    onChange={(event) => handleChange(event, medicamento['Nome do Medicamento'])}
                                                >
                                                    {medicamento['Doença(s)'].map((doença, idx) => (
                                                        <FormControlLabel
                                                            key={idx}
                                                            value={doença}
                                                            control={<Radio />}
                                                            label={doença}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            

            {/* <div className="container">
                <div className="row justify-content-end mt-3">
                    <div className="col-auto">
                        <Button className='continuebtn' variant="outlined" onClick={handleContinueButton}>Continuar</Button>
                    </div>
                </div>
            </div> */}

            </main>

            <Footer></Footer>
        </div>
    );
}

export default SeleçaoDoenças;