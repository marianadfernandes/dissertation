import logo_alt from "../img/logo-alt.png";
import element from "../img/element.png";


function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-6 footer-text">
                        <div className="footer-logo">
                            <img src={logo_alt} />
                        </div>
                        <p>
                        Projeto de Dissertação de 
                        Mestrado Integrado em Engenharia 
                        Biomédica, Especialização em 
                        Informática Médica
                        </p>
                        <p>&copy; Universidade do Minho, 2024</p>
                    </div>
                </div>
            </div>
            <img src={element} className="footer-shape-1"/>
            <img src={element} className="footer-shape-2"/>
        </footer>
    )
}

export default Footer;