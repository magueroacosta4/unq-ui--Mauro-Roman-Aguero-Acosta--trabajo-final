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
            barcoClick(portaaviones);
        }
    },[barcosPJ1]);

    const handleFinalizar = (barcos) => {
        if (barcos.every((b) => b.tienePosicion())) finalizar();
        else alert("Faltan barcos por colocar");
    }

    return (
        <>
            <div className="buttons-container">
                <div className="buttons">
                    <div><img style={{marginRight: "3.4rem"}} src={rotateSVG} className="button rotar" onClick={()=>{barco.orientacion = !barco.orientacion}}/> </div>   
                    <div>
                    <img src={submarinoSVG} className="button" onClick={()=>barcoClick(submarino)}/>
                    <img src={cruceroPNG} className="button" onClick={()=>barcoClick(crucero)}/>
                    </div>
                    <div>
                    <img src={lanchaSVG} className="button" onClick={()=>barcoClick(lancha)}/>
                    <img src={portaavionesSVG} className="button" onClick={()=>barcoClick(portaaviones)}/>
                    </div>
                    <div><img src={finalizarSVG} className="button finalizar"  onClick={()=>handleFinalizar([portaaviones, crucero, submarino, lancha])} />   </div> 
                </div>
            </div>
        </>
    )
}

export default BotonesDeJuego;