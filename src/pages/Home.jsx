import { useContext, useEffect } from "react";
import { GameContext } from "../hooks/GameContext";
import "../styles/Home.css";
import { useState } from "react";
import { useRef } from "react";
import Barco from "../classes/Barco";
import Tablero from "../components/Tablero";

const Home = () => {

    const {turno, casillaAtacadaPJ1, tablePj1 : tablero, verificarSiHayBarco,
         eliminarBarcoDeTablero, tablePj2: tableroAtaque, resetGame,
          putShip, pj1Attack, comenzarComputadora} = useContext(GameContext);

    const [barco, setBarco] = useState(null);
    const [etapa, setEtapa] = useState(0);
    const [barcoOrientacion, setBarcoOrientacion] = useState(false);
    const [portaaviones] = useState(new Barco("portaaviones", 4, true));
    const [crucero] = useState(new Barco("crucero", 4, true));
    const [submarino] = useState(new Barco("submarino", 4, true));
    const [lancha] = useState(new Barco("lancha", 2, true));

    const tableroRef = useRef(null);
    
    useEffect(() => {
        
    }, [tablero])

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
        etapa === 0 && (!barco.tienePosicion() ? colocarBarco(p.i, p.j) : cambiaPosicion(p.i, p.j))

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
    
    const agregarBarco = (tipo) => {
            setBarco(tipo);
    }
    
    const finalizarEleccion = () => {
        tableroRef.current.className = "tableroPostEleccion";
        comenzarComputadora();
        setEtapa(1);
    }


    return (
        <div >
            <div className="gameContainer">
                {etapa === 1 && 
                <div className="tableroInicio" >
                    <Tablero onClick={(p)=> handleClickAtaque(p)}  tablero={tableroAtaque} idStart="t2" />
                </div>}
                <div className="tableroInicio" ref={tableroRef} >
                    <Tablero onClick={(p)=>handleClickCasilla(p)} tablero={tablero} idStart="t1" />
                </div>
            </div>
            <div>
                <button onClick={()=>agregarBarco(lancha)}>lancha</button>
                <button onClick={()=>agregarBarco(portaaviones)}>portaaviones</button>
                <button onClick={()=>agregarBarco(crucero)}>crucero</button>
                <button onClick={()=>agregarBarco(submarino)}>submarino</button>
                <button onClick={()=>{barco.orientacion = !barco.orientacion; setBarcoOrientacion(!barcoOrientacion)} }>rotar</button>
                <button onClick={()=>finalizarEleccion()}>finalizar</button>
            </div>
            {crucero.estaHundido() && portaaviones.estaHundido() && submarino.estaHundido() && lancha.estaHundido() &&
                <div>
                <button onClick={()=>resetGame()}>reset</button>
                </div>}
                
        </div>
        
    );
}

export default Home;