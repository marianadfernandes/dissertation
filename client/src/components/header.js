import logo from "../img/logo.png";

import { useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();

    const navHome = async () => navigate("/");
    const navServices = async () => navigate({ hash: '#services' });

    return (
        <header className="header">
            <div className="container">
                <div className="logo-nav navbar navbar-expand-lg navbar-light p-0">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src={logo} />
                    </a>
                    <nav className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="active"><a onClick={navHome}>Home</a></li>
                            <li><a onClick={navServices}>Serviços</a></li>
                            <li><a href="#">Sobre</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;