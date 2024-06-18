import { React, useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { 
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import edit_icon from "../img/edit-icon.png";

import {uri} from '../App'

function ConfigurarMedicamentos () {

    const [medicamento, setMedicamento] = useState(''); 
    const [dosagem, setDosagem] = useState('');
    const [resultados, setResultados] = useState([]); 
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        substanciaAtiva: '',
        nomeMedicamento: '',
        farmaceutica: '',
        dosagem: '',
        titularAIM: '',
        generico: '',
        comercializacao: '',
        doencas: []
    });

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

    const rows = resultados.map(item => ({
        id: item._id,
        nomeMed: item.nome,
        substancia: item.substancia_ativa,
        dosagem: item.dosagem,
        farmaceutica: item.forma,
        titularAIM: item.titular,
        generico: item.generico,
        comercializacao: item.comercializacao,
        doencas: item.doencas
    }));

    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            substanciaAtiva: row.substancia,
            nomeMedicamento: row.nomeMed,
            farmaceutica: row.farmaceutica,
            dosagem: row.dosagem,
            titularAIM: row.titularAIM,
            generico: row.generico,
            comercializacao: row.comercializacao,
            doencas: row.doencas
        });
        setOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="general-page">

        <Header></Header>

        <main>

        <div className="search-bar">
                <div className="container">
                        <h6>Pesquise pelo medicamento a editar</h6>
                        <div className="underline-1"></div>
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Nome do Medicamento</TableCell>
                                    <TableCell align="right">Substância Ativa/DCI</TableCell>
                                    <TableCell align="right">Dosagem</TableCell>
                                    <TableCell align="right">Titular de AMI</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.nomeMed}
                                    </TableCell>
                                    <TableCell align="right">{row.substancia}</TableCell>
                                    <TableCell align="right">{row.dosagem}</TableCell>
                                    <TableCell align="right">{row.titularAIM}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => handleEdit(row)}>
                                            <EditIcon />
                                        </IconButton>

                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            
                        </div>
                    {/* </div> */}
                </div>
            )}

            <Dialog open={open} onClose={handleClose}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <img className="edit-icon" src={edit_icon} alt=""></img>
                            Preencha os campos abaixo para editar o medicamento
                        </DialogContentText>
                        <TextField
                            disabled
                            margin="dense"
                            name="substanciaAtiva"
                            label="Substância Ativa"
                            fullWidth
                            defaultValue={formData.substanciaAtiva}
                            onChange={handleInputChange}
                        />
                        <TextField
                            disabled
                            margin="dense"
                            name="nomeMedicamento"
                            label="Nome do Medicamento"
                            fullWidth
                            defaultValue={formData.nomeMedicamento}
                            onChange={handleInputChange}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            disabled
                            margin="dense"
                            name="formaFarmaceutica"
                            label="Forma Farmacêutica"
                            style={{ width: '48%' }}
                            fullWidth
                            defaultValue={formData.farmaceutica}
                            onChange={handleInputChange}
                        />
                        <TextField
                            disabled
                            margin="dense"
                            name="dosagem"
                            label="Dosagem"
                            style={{ width: '48%' }}
                            fullWidth
                            defaultValue={formData.dosagem}
                            onChange={handleInputChange}
                        />
                        </div>
                        <TextField
                            disabled
                            margin="dense"
                            name="titularAIM"
                            label="Titular de AIM"
                            fullWidth
                            defaultValue={formData.titularAIM}
                            onChange={handleInputChange}
                        />
                        <TextField
                            disabled
                            margin="dense"
                            name="generico"
                            label="Genérico"
                            fullWidth
                            defaultValue={formData.generico}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            select
                            label="Comercialização"
                            fullWidth
                            defaultValue="Comercializado"
                            SelectProps={{
                                native: true,
                            }}
                            >
                            <option value="Comercializado">Comercializado</option>
                            <option value="Não Comercializado">Não Comercializado</option>
                            <option value="Temporariamente Indisponível">Temporariamente Indisponível</option>
                        </TextField>
                        <TextField
                            margin="dense"
                            select
                            label="Doença(s)"
                            fullWidth
                            defaultValue={formData.doencas}
                            SelectProps={{
                                native: true,
                            }}
                            >
                            {formData.doencas.map((option) => (
                                <option key={option} value={option}>
                                {option}
                                </option>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary"></Button>
                    </DialogActions>
            </Dialog>

        </main>

        <Footer></Footer>
        </div>
    );
}

export default ConfigurarMedicamentos;