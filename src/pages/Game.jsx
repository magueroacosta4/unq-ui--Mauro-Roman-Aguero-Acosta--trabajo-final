import { useContext, useEffect } from "react";
import { GameContext } from "../hooks/GameContext";
import "../styles/Game.css";
import { useState } from "react";
import { useRef } from "react";
import Tablero from "../components/Tablero";
import BotonesDeJuego from "../components/botonesDeJuego";

import ModalFinalizacionJuego from "../components/modalFinalizacionJuego";
import Historial from "../components/historial";

const Game = () => {

    const {turno, casillaAtacadaPJ1, tablePj1 : tablero, verificarSiHayBarco,
         eliminarBarcoDeTablero, tablePj2: tableroAtaque, partidaFinalizada,
          putShip, pj1Attack, comenzarComputadora, resetGame} = useContext(GameContext);

    const [barco, setBarco] = useState(null);
    const [etapa, setEtapa] = useState(0);
    const [turnoTexto, setTurnoTexto] = useState("ES TU TURNO");
    const headerRef = useRef(null);
    const tableroRef = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("game mounted");
        resetGame();
      }, [])

    useEffect(() => {
        partidaFinalizada.ganador && setOpen(true) 
    }, [partidaFinalizada]);

    useEffect(() => {
        if (turno) {
            setTurnoTexto("ES TU TURNO");
            headerRef.current.style = "background-color: #23FF00";
        } else {
            setTurnoTexto("ESPERANDO AL RIVAL");
            headerRef.current.style = "background-color: #DE0033";
        }
    }, [turno]);

    useEffect(() => {
        if (casillaAtacadaPJ1) {
            if (casillaAtacadaPJ1.golpe) {
                document.getElementById(`t1${casillaAtacadaPJ1.x}${casillaAtacadaPJ1.y}`).className = "casillaAtacadaJugador";
            }
            else {
                document.getElementById(`t1${casillaAtacadaPJ1.x}${casillaAtacadaPJ1.y}`).className = "casillaAtacadaAgua";
            }
        }
    }, [casillaAtacadaPJ1]);

    const colocarBarco = (x, y) => {
        putShip(tablero,x, y, barco, ()=>{
        if(barco.orientacion){
            for (let i = 0; i < barco.size; i++) {
                document.getElementById(`t1${x}${y-i}`).className= barco.tipo}
            } else{
                for (let i = 0; i < barco.size; i++) {
                    document.getElementById(`t1${x-i}${y}`).className= barco.tipo;
                }
            }
        })
    }

    const cambiaPosicion = (x, y) => {
        if (!verificarSiHayBarco(tablero,x,y, barco)) {  
        if(barco.getPosicion()[0].x === barco.getPosicion()[1].x){
            
            for (let i = 0; i < barco.size; i++) {
                document.getElementById(`t1${barco.getPosicion()[i].x}${barco.getPosicion()[i].y}`).className="casilla"} 
            } else{
                for (let i = 0; i < barco.size; i++) {
                    document.getElementById(`t1${barco.getPosicion()[i].x}${barco.getPosicion()[i].y}`).className="casilla";
                }
            }
        eliminarBarcoDeTablero(tablero, barco);
        colocarBarco(x, y);
        } else {alert("hay un barco que impide ponerlo ")};
    }
    
    const handleClickCasilla = (p) => {
        etapa === 0 && barco && (!barco.tienePosicion() ? colocarBarco(p.i, p.j) : cambiaPosicion(p.i, p.j))
    }

    const handleClickAtaque = (p) => {
        etapa === 1 && turno && pj1Attack(p.i, p.j, (s)=>{ 
            if(s) {
                document.getElementById(`t2${p.i}${p.j}`).className = "casillaAtacadaJugador";
            }
            else {
                document.getElementById(`t2${p.i}${p.j}`).className = "casillaAtacadaAgua";
            }
        });
    }
    
    const finalizarEleccion = () => {
        tableroRef.current.className = "tableroPostEleccion";
        comenzarComputadora();
        setEtapa(1);
    }



    return (
        <div style={{backgroundColor : "#101B27", display: "flex", flexWrap: "wrap"}}>
            <div className="header" ref={headerRef}>
                <p className="header-text">{etapa == 0 ? "COLOCA TUS BARCOS": turnoTexto}</p>
            </div>
            <div className="gameContainer">
                {etapa === 1 && 
                <div className="tableroInicio" >
                    <Tablero onClick={(p)=> handleClickAtaque(p)}  tablero={tableroAtaque} idStart="t2" />
                </div>}
                <div >
                    <div className="tableroInicio" ref={tableroRef} >
                        <Tablero onClick={(p)=>handleClickCasilla(p)} tablero={tablero} idStart="t1" />
                    </div>
                    {etapa === 1 &&
                        <Historial />
                        }
                </div>
                {etapa === 0 && 
                        <BotonesDeJuego barco={barco} barcoClick={setBarco} finalizar={finalizarEleccion}/>
                    }

            </div>

            <div >
                <ModalFinalizacionJuego ganador={partidaFinalizada.ganador == "pj1" ? "¡Ganaste la partida!" : "La computadora gano la partida"} mostrarModal={open}/>
            </div>
        </div>
        
    );
}

export default Game;