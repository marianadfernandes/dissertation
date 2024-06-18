import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "./header";
import Footer from "./footer";

import {uri} from '../App'

function PesquisaMedicamentos () {

    const [medicamento, setMedicamento] = useState(''); 
    const [dosagem, setDosagem] = useState('');
    const [resultados, setResultados] = useState([]); 
    const [linhaSelecionada, setLinhaSelecionada] = useState({});
    const navigate = useNavigate();

    const location = useLocation();
    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([]);

    useEffect(() => {
        const { medicamentosSelecionados: initialMedicamentosSelecionados } = location.state || { medicamentosSelecionados: [] };
        setMedicamentosSelecionados(initialMedicamentosSelecionados);
    }, [location.state]);

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
        id: item.id,
        nomeMed: item.nome,
        substancia: item.substancia_ativa,
        dosagem: item.dosagem,
        farmaceutica: item.titular
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
        setLinhaSelecionada(resultados.find(item => item.id === newSelection[0]));
    
    };

    
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

    const handleDelete = (medicamento) => (event) => {
        setMedicamentosSelecionados(medicamentosSelecionados.filter(med => med.id !== medicamento.id));
    }

    return (
        <div className="general-page">

            <Header></Header>

            <main>

            <div className="search-bar">
                <div className="container">
                    <div className="row">
                        <h6>Selecione os medicamentos que toma habitualmente</h6>
                        <div className="underline-1"></div>

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
                                <button className="btn-2" type="submit">Pesquisa</button>
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
                                getRowId={(row) => row.id}
                            />  

                            <Button className='selectedbtn' variant="outlined" onClick={handleSelectedButton}>Selecionar</Button>
                        </div>
                    {/* </div> */}
                </div>
            )}

            {medicamentosSelecionados.length > 0 && (
                <div className="medicamentos-selecionados pesquisa">
                    <div className="container">
                        <h6>Medicamentos Selecionados</h6>
                        <div className="underline-1"></div>
                        {medicamentosSelecionados.map((medicamento, index) => (
                            <div key={index} className="result-row">
                                <p>{medicamento.nome}</p>
                                <p>{medicamento.dosagem}</p>
                                <IconButton aria-label="delete" onClick={handleDelete(medicamento)} >
                                    <DeleteIcon />
                                </IconButton>
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