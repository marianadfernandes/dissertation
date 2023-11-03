import {Link } from "react-router-dom";

function Home() {

    return (
        <div className="home-container">
            {/* <div class="d-grid gap-2 col-6 mx-auto"> */}
                <button type="button">
                    <Link to="/tabela">Tabela</Link>
                </button>
                <button type="button">
                    <Link to="/pesquisa">Pesquisa</Link>
                </button>
            {/* </div> */}
        </div>
    )
}

export default Home;
