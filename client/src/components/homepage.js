import { React, useState, useEffect } from "react";
import axios from "axios";

import Header from "./header";
import Footer from "./footer";

import image from "../img/home-page-img.jpg";
import element from "../img/element.png";
import icon from "../img/icon-serv-1.png";
import shape from "../img/service-shape-1.png";
import lupa from '../img/lupa.png';
import utente from '../img/icon-utente.png'

import { useNavigate } from "react-router-dom";

function NewHomePage() {
    let navigate = useNavigate();

    const navTabela = async () => { navigate("/tabela"); window.scrollTo(0, 0);}
    const navCalculo = async () => { navigate("/avaliacao"); window.scrollTo(0, 0);}
    const navUtente = async () => { navigate("/utente"); window.scrollTo(0, 0);}

    return (
        <div>
        <Header />
        <main>
            <div className="landing-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-flex flex-column text-lg-left text-center">
                            <h1>Avaliação do <br/>Dano Corporal</h1>
                        </div>
                        <div className="col-lg-6 text-lg-left text-center">
                            <img src={image} className="landing-page-ilust"/>
                        </div>
                    </div>
                </div>
                <img src={element} className="landing-page-shape-1"/>
            </div>

            <div className="services" id="services">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 heading">
                            <h2>Serviços</h2>
                            <div className="underline-1">
                            </div>
                        </div>
                        <div className="col-lg-12 content">
                            {/* service 1 */}
                            <div className="service">
                                <div className="service-img">
                                    <img src={lupa}/>
                                </div>
                                <a onClick={navCalculo}><h3>Avaliação do Dano Corporal</h3></a>
                                <p>Realize o cálculo da incapacidade
                                total do trabalhador
                                </p>
                            </div>
                            {/* service 2 */}
                            <div className="service">
                                <div className="service-img">
                                    <img src={icon}/>
                                </div>
                                <a onClick={navTabela}><h3>Tabela Nacional de Incapacidades</h3></a>
                                <p>Visualize a tabela nacional de 
                                    incapacidades portuguesa em 
                                    formato digital</p>
                            </div>
                            {/* service 3 */}
                            <div className="service">
                                <div className="service-img">
                                        <img src={utente}/>
                                    </div>
                                    <a onClick={navUtente}><h3>Formulário Inicial</h3></a>
                                    <p>Versão utilizador comum: 
                                        Recolha de dados pessoais e 
                                        de saúde
                                    </p>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <img src={element} className="services-shape-1" />
                <img src={shape} className="services-shape-2"/>
            </div>
        </main>

        <Footer />
        </div>
    )
}

export default NewHomePage;