import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import Header from "./header";
import Footer from "./footer";

import {uri} from '../App'

function PesquisaMedicamentos () {

    const [medicamento, setMedicamento] = useState(''); 
    const [dosagem, setDosagem] = useState('');
    const [resultados, setResultados] = useState([]); 
    const [linhaSelecionada, setLinhaSelecionada] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const url = uri + '/medicamento/search';
            const response = await axios.get(`${url}/${medicamento}/${dosagem}`);
    
            // Verifique se a resposta possui dados antes de atualizar o estado
            if (response.data) {
                setResultados(response.data);
                console.log('response', response.data); // Use a resposta diretamente aqui
                console.log('informações', resultados)
            } else {
                console.error('Resposta vazia:', response);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação:', error);
        }
    };

    const columns = [
        { field: 'nomeMed', headerName: 'Nome do Medicamento', width: 300 },        
        { field: 'substancia', headerName: 'Substância Ativa/DCI', width: 250 },
        { field: 'dosagem', headerName: 'Dosagem', width: 130 },
        { field: 'farmaceutica', headerName: 'Titular de AMI', width: 230 }
    ];

    const rows = resultados.map(item => ({
        id: item._id,
        nomeMed: item['Nome do Medicamento'],
        substancia: item['Substância Ativa/DCI'],
        dosagem: item.Dosagem,
        farmaceutica: item['Titular de AIM']
    }));

    // useEffect para lidar com mudanças em linhaSelecionada
    useEffect(() => {
        if (linhaSelecionada) {
            console.log('medicamento:', linhaSelecionada);
        }
    }, [linhaSelecionada]); // Executa sempre que linhaSelecionada mudar
    
    const [lastSelection, setLastSelection] = useState(null);

    // Defina uma função para lidar com a mudança na seleção
    const handleSelectionChange = (newSelection) => {
        console.log('newselection inicial', newSelection)
        
        if (!lastSelection) {

            const selectedRow = document.querySelector(`div[data-id="${newSelection}"]`)
            setLastSelection(selectedRow);

        } else {

            console.log('a remover', lastSelection.getAttribute('data-id'))

            // Desselecionar linha anterior
            lastSelection.classList.remove('Mui-selected');
            lastSelection.setAttribute('aria-selected', 'false');

            const firstSpan = lastSelection.querySelector('span');
            firstSpan.classList.remove('Mui-checked');

            const firstInput = firstSpan.querySelector('input');
            firstInput.setAttribute('aria-label', 'Select Row');

            const firstSVG = firstSpan.querySelector('svg');
            firstSVG.setAttribute('data-testid', 'CheckBoxOutlineBlankIcon');

            const firstPath = firstSVG.querySelector('path');
            firstPath.setAttribute('d', 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z')

            // Remover da lista
            const indexToRemove = newSelection.indexOf(lastSelection.getAttribute('data-id'));
            if (indexToRemove !== -1) {
                newSelection.splice(indexToRemove, 1);
            }

            // Nova lastSelection
            const selectedRow = document.querySelector(`div[data-id="${newSelection}"]`)
            setLastSelection(selectedRow);
            console.log('nova lastselection', lastSelection)
            
        }

        console.log('newSelection final', newSelection);
        setLinhaSelecionada(resultados.find(item => item._id === newSelection[0]));
    
    };

    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([]);
    const handleSelectedButton = () => {
        // Verifica se a linhaSelecionada está definida e não está vazia
        if (linhaSelecionada && Object.keys(linhaSelecionada).length > 0) {
            console.log('medicamento:', linhaSelecionada)
            // Adiciona a linhaSelecionada aos medicamentos selecionados
            setMedicamentosSelecionados(prevState => [...prevState, linhaSelecionada]);
            console.log('medicamentos:', medicamentosSelecionados)

            setResultados([]);

            setMedicamento('');
            setDosagem('');

        }
    }

    function handleContinueButton() {
        navigate('/medicamentos/doenças', { state: { medicamentosSelecionados } });
      }

    return (
        <div className="general-page">

            <Header></Header>

            <main>
            <div className="search-bar">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-light bg-light">
                            <form className="form-inline" onSubmit={handleSubmit}>
                                <input
                                    className="medicamento-input form-control mr-lg-2"
                                    type="search"
                                    value={medicamento}
                                    onChange={(event) => setMedicamento(event.target.value)}
                                    placeholder="Insira o medicamento"
                                />
                                <input
                                    className="dosagem-input form-control mr-lg-2"
                                    type="search"
                                    value={dosagem}
                                    onChange={(event) => setDosagem(event.target.value)}
                                    placeholder="Insira a dosagem"
                                />
                                <button className="btn-2" type="submit">Buscar</button>
                            </form>
                        </nav>
                    </div>
                </div>
            </div>

            {rows.length > 0 && (
                <div className="medicamentos-result">
                    <div className="container">
                        {/* <div className="row"> */}
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                selectionModel={linhaSelecionada}
                                onRowSelectionModelChange={handleSelectionChange}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 20]}
                                checkboxSelection
                            />  

                            <Button className='selectedbtn' variant="outlined" onClick={handleSelectedButton}>Selecionar</Button>
                        </div>
                    {/* </div> */}
                </div>
            )}

            {medicamentosSelecionados.length > 0 && (
                <div className="medicamentos-selecionados">
                    <div className="container">
                        {medicamentosSelecionados.map((medicamento, index) => (
                            <div key={index} className="result-row">
                                <p>{medicamento['Nome do Medicamento']}</p>
                                <p>{medicamento['Dosagem']}</p>
                            </div>
                        ))}
                        <Button className='continuebtn' variant="outlined" onClick={handleContinueButton}>Continuar</Button>
                    </div>
                </div>
            )}



        </main>
        <Footer></Footer>
        </div>
    );
}

export default PesquisaMedicamentos;