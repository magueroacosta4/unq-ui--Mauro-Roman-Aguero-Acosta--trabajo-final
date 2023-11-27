import { useContext } from "react";
import Casilla from "../components/Casilla";
import { GameContext } from "../hooks/GameContext";
import "../styles/Home.css";
import { useState } from "react";
import { useRef } from "react";
import createTable from "../hooks/createTable";
import Barco from "../classes/Barco";
import Tablero from "../components/Tablero";

const Home = () => {

    const {tablePj1 : tablero, tablePj2: tableroAtaque, resetGame, putShip, pj2Attack} = useContext(GameContext);

    const [barco, setBarco] = useState(null);
    const [etapa, setEtapa] = useState(0);
    const [barcoColor, setBarcoColor] = useState("purple");
    const [barcoOrientacion, setBarcoOrientacion] = useState(false);


    const tableroRef = useRef(null);
    
    const handleClickCasilla = (p) => {
        etapa == 0 && putShip(p.i, p.j, barco, ()=>{
            if(barco.orientacion){
                for (let i = 0; i < barco.size; i++) {
                    document.getElementById(`t1${p.i}${p.j-i}`).style.backgroundColor = barcoColor}
                } else{
                    for (let i = 0; i < barco.size; i++) {
                        document.getElementById(`t1${p.i-i}${p.j}`).style.backgroundColor = barcoColor;
                    }
                }
        });
        console.log(barcoOrientacion);
    
    }

    const handleClickAtaque = (p) => {
        pj2Attack(p.i, p.j, (s)=>{ document.getElementById(`t2${p.i}${p.j}`).style.backgroundColor = s;});
        console.log(tablero);
    }
    
    const agregarBarco = (tipo, cant, color) => {
            let barco = new Barco(tipo, cant, barcoOrientacion)
            setBarco(barco);
            setBarcoColor(color);

    }
    
    const finalizarEleccion = () => {
        tableroRef.current.className = "tableroPostEleccion";
        setEtapa(1);
    }

    return (
        <div >
            <div className="gameContainer">
                {etapa == 1 && 
                <div className="tableroInicio" >
                    <Tablero onClick={(p)=> handleClickAtaque(p)}  tablero={tableroAtaque} idStart="t2" />
                </div>}
                <div className="tableroInicio" ref={tableroRef} >
                    <Tablero onClick={(p)=>handleClickCasilla(p)} tablero={tablero} idStart="t1" />
                </div>
            </div>
            <div>
                <button onClick={()=>agregarBarco("lancha", 2, "orange")}>change ver</button>
                <button onClick={()=>agregarBarco("portaaviones", 4, "black")}>change h</button>
                <button onClick={()=>{barco.orientacion = !barco.orientacion; setBarcoOrientacion(!barcoOrientacion)} }>rotar</button>
                <button onClick={()=>finalizarEleccion()}>finalizar</button>
            </div>
        </div>
        
    );
}

export default Home;