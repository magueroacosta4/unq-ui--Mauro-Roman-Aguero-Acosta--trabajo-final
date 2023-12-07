import submarinoSVG from "../images/submarine-icon.svg";
import cruceroPNG from "../images/pngwing.com.png";
import lanchaSVG from "../images/66.png";
import portaavionesSVG from "../images/warship-icon.svg";
import rotateSVG from "../images/iconmonstr-refresh-1.svg";
import finalizarSVG from "../images/right-arrow-svgrepo-com.svg";
import { useContext, useEffect, useState } from "react";
import Barco from "../classes/Barco";
import GameContext from "../hooks/GameContext";
import "../styles/BotonesDeJuego.css"


const BotonesDeJuego = ({barcoClick, finalizar, barco}) => {
    const {barcosPJ1} = useContext(GameContext);

    const [portaaviones] = useState(new Barco("portaaviones", 4, true));
    const [crucero] = useState(new Barco("crucero", 4, true));
    const [submarino] = useState(new Barco("submarino", 4, true));
    const [lancha] = useState(new Barco("lancha", 2, true));

    useEffect(() => {
        if(barcosPJ1.length == 0) {
            barcosPJ1.push(portaaviones);
            barcosPJ1.push(crucero);
            barcosPJ1.push(submarino);
            barcosPJ1.push(lancha);
        }
    },[]);

    const handleFinalizar = (barcos) => {
        if (barcos.every((b) => b.tienePosicion())) finalizar();
        else alert("Faltan barcos por colocar");
    }

    return (
        <>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <div style={{marginLeft:"5rem", marginTop: "2rem", display: "flex", flexWrap: "wrap", flexDirection: "column", width: "20%"}}>
                    <img style={{marginRight: "3.4rem"}} src={rotateSVG} className="rotar-button" onClick={()=>{barco.orientacion = !barco.orientacion}}/>    
                    <img src={submarinoSVG} className="barco-button" onClick={()=>barcoClick(submarino)}/>
                    <img src={cruceroPNG} className="barco-button" onClick={()=>barcoClick(crucero)}/>
                    <img src={lanchaSVG} className="barco-button" onClick={()=>barcoClick(lancha)}/>
                    <img src={portaavionesSVG} className="barco-button" onClick={()=>barcoClick(portaaviones)}/>
                    <img src={finalizarSVG} className="finalizar-button"  onClick={()=>handleFinalizar([portaaviones, crucero, submarino, lancha])} />    
                </div>
            </div>
        </>
    )
}

export default BotonesDeJuego;