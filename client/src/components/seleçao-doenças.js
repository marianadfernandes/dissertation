import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Header from "./header";
import Footer from "./footer";

import confirm_icon from "../img/confirm-icon.png";

function ConfirmDialog({ open, handleClose, handleConfirm, data }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
            fullWidth='md'
        >
            <DialogTitle id="confirmation-dialog-title"></DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    <img className="confirm-icon" src={confirm_icon} alt=""></img>
                    Tem certeza que deseja submeter os seguintes dados?
                </DialogContentText>
                <Grid container spacing={2}>
                    {Object.entries(data).map(([medicamento, doenças], index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="h6">{medicamento}</Typography>
                            <Typography variant="body2"><strong>Usado para tratar:</strong> {doenças.join(', ')}</Typography>
                        </Grid>
                    ))}
                </Grid>


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} variant="outlined" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function SeleçaoDoenças () {

    const location = useLocation();
    const { medicamentosSelecionados } = location.state || { medicamentosSelecionados: [] };

    const navigate = useNavigate();

    const [doençaSelecionada, setDoençaSelecionada] = useState({});

    const [open, setOpen] = useState(false); 
    const [confirmData, setConfirmData] = useState({});

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
 
    const handleAutocompleteChange = (medicamentoNome, newValue) => {
        setDoençaSelecionada(prevState => ({
            ...prevState,
            [medicamentoNome]: newValue,
        }));
    };

    const handleSubmitButton = () => {
        setConfirmData(doençaSelecionada);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        // Lógica de confirmação
        console.log("Dados confirmados:", confirmData);
        setOpen(false);
    };

    const handleBackButton = () => {
        navigate('/medicamentos/pesquisa', { state: { medicamentosSelecionados } });
    }


    return (
        <div className="general-page">

        <Header></Header>

        <main>

        {medicamentosSelecionados.length > 0 && (
            <div className="medicamentos-selecionados">
                <div className="container">
                    <h6>Selecione a doença associada ao medicamento selecionado</h6>
                    <div className="underline-1"></div>

                    <Button className="backbtn" 
                            startIcon={<NavigateBeforeIcon/>}
                            variant="outlined" 
                            onClick={handleBackButton}>Voltar</Button>

                        {medicamentosSelecionados.map((medicamento, index) => (
                            <div key={index} className="result-row">
                                <p>{medicamento['Nome do Medicamento']}</p>
                                <p>{medicamento['Dosagem']}</p>
                                    <div className="doenças-container">
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Selecione uma ou mais doenças para {medicamento['Nome do Medicamento']}
                                            </FormLabel>
                                            <Autocomplete
                                                multiple
                                                id={`doenças-${index}`}
                                                options={medicamento['Doença(s)'] || []}
                                                getOptionLabel={(option) => option}
                                                value={doençaSelecionada[medicamento['Nome do Medicamento']] || []}
                                                onChange={(event, newValue) =>
                                                    handleAutocompleteChange(medicamento['Nome do Medicamento'], newValue)
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Selecione doenças"
                                                        placeholder="Doenças"
                                                    />
                                                    )}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            ))}
                            <Button className='submitbtn' 
                                    endIcon={<NavigateNextIcon/>}
                                    variant="outlined" 
                                    onClick={handleSubmitButton}>Submeter</Button>
                        </div>
                </div>
                )}

            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                data={confirmData}
            />

            </main>

            <Footer></Footer>
        </div>
    );
}

export default SeleçaoDoenças;