import logo from "../img/logo.png";

import { useNavigate, useLocation } from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    let location = useLocation();

    const navHome = async () => navigate("/");

    const navigateToHomeAndScrollToServices = () => {
        if (location.pathname === "/") {
            scrollToServices();
        } else {
            navigate("/", { scroll: { offsetTop: 0, hash: "#services", behavior: "smooth" } });
        }
    };

    const scrollToServices = () => {
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo-nav navbar navbar-expand-lg navbar-light p-0">
                    <a className="navbar-brand d-flex align-items-center" onClick={navHome}>
                        <img src={logo} />
                    </a>
                    <nav className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="active"><a onClick={navHome}>Home</a></li>
                            <li><a onClick={navigateToHomeAndScrollToServices}>Serviços</a></li>
                            <li><a href="#">Sobre</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;