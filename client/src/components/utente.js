import Header from "./header";
import Footer from "./footer";
import MenBody from './MenBody';

function Utente () {

    return (
        <div>
            <Header>
            </Header>

            <main>
                <div className="human-body">
                    <div className="container">
                        <div className="row">
                            <MenBody></MenBody>
                        </div>
                    </div>
                </div>
            </main>

            <Footer>
            </Footer>
        </div>
    )
}

export default Utente;