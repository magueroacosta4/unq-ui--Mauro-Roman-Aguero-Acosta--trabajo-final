import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {

    const pj1Wins = window.localStorage.getItem("pj1");
    const computadoraWins = window.localStorage.getItem("computadora");
    


    return (
        <div className="home-container">
                <h1 className="tittle">Batalla Naval</h1>
                <div onClick={() => window.location.replace("/game")} className="home-button">
                    <p className="home-text"> Jugar contra computadora </p>
                </div>
                <div>
                    <p className="home-text wins">partidas ganadas</p>
                    <div>
                        <p className="home-text wins">TU: {pj1Wins? pj1Wins: 0}</p>
                        <p className="home-text wins">I.A: {computadoraWins? computadoraWins: 0}</p>
                    </div>
                </div>
        </div>
        

    )
}


export default Home;