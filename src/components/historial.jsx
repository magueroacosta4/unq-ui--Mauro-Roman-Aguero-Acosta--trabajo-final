import { useContext, useEffect, useRef, useState } from "react";
import GameContext from "../hooks/GameContext";
import "../styles/Historial.css";
import HistorialRow from "./HistorialRow";


const Historial = ({}) => {

    const {casillaAtacadaPJ1, casillaAtacadaPJ2, barcoHundido} = useContext(GameContext);
    const [historial, setHistorial] = useState([]);
    const historialRef = useRef(null);

    useEffect(() => {
        historialRef.current.lastElementChild && historialRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [historial])

    useEffect(() => {
        barcoHundido && historial.push({hundido: true, casilla: barcoHundido})
    }, [barcoHundido])

    useEffect(() => {
        casillaAtacadaPJ1 && setHistorial([...historial, {hundido: false, jugador: "computadora",casilla: casillaAtacadaPJ1}])
    }, [casillaAtacadaPJ1])

    useEffect(() => {
        casillaAtacadaPJ2 && setHistorial([...historial, {hundido: false, jugador: "pj1", casilla: casillaAtacadaPJ2}])
    }, [casillaAtacadaPJ2])

    return (
        <div className="historial-container" ref={historialRef}>
            {historial.length != 0 && historial.map((h) => 
            <HistorialRow row={h} key={historial.indexOf(h)}/>
            )}
        </div>
    )
}

export default Historial;