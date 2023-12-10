


import { Modal } from "react-bootstrap";

import { useContext } from "react";
import GameContext from "../hooks/GameContext";


const ModalFinalizacionJuego = ({ mostrarModal, ganador }) => {

    const {resetGame} = useContext(GameContext);

    const handleFinalizar = () => {
        const localItem = window.localStorage.getItem(ganador);
        window.localStorage.setItem(ganador, localItem? parseInt(localItem) + 1: 1);
        window.location.replace("/");
        resetGame();
    }


    return (
    
        <Modal keyboard={false} show={mostrarModal} >
            <Modal.Header closeButton>
              <Modal.Title>¡Partida finalizada!</Modal.Title>
              
            </Modal.Header>
            <Modal.Body style={{display: "flex", flex: "wrap", flexDirection: "column"}}>
              {ganador == "pj1" ? "¡Ganaste la partida!" : "computadora"? "La computadora gano la partida": ""}
              <button style={{marginTop: "1rem"}} className="btn btn-primary" onClick={()=> handleFinalizar()}>Volver al inicio</button>
            </Modal.Body>

        </Modal>

    )
}

export default ModalFinalizacionJuego