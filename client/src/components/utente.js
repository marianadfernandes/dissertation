import { React, useState, useEffect } from "react";
import axios from "axios";


import Header from "./header";
import Footer from "./footer";
import MenBody from './MenBody';

function Utente () {

    const baseURL = "http://localhost:3001/tabela/listTabela";
    // const baseURL = "http://54.38.159.80/aprioriapp/tabela/listTabela";

    const [tabela, setTabela] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(baseURL);
            console.log(JSON.stringify(response.data));
            setTabela(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);

      const handleClick = () => {
        console.log(tabela[2]);
      }
    return (
        <div>
            <Header>
            </Header>

            <main>
                <div className="human-body">
                    <div className="container">
                        <div className="row">
                            <MenBody onClick={handleClick}></MenBody>
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