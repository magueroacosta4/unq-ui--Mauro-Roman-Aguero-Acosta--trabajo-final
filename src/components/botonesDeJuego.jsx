import submarinoSVG from "../images/submarine-icon.svg";
import cruceroPNG from "../images/pngwing.com.png";
import lanchaSVG from "../images/66.png";
import portaavionesSVG from "../images/warship-icon.svg";
import rotateSVG from "../images/iconmonstr-refresh-1.svg";
import finalizarSVG from "../images/right-arrow-svgrepo-com.svg";
import { useContext} from "react";
import GameContext from "../hooks/GameContext";
import "../styles/BotonesDeJuego.css"


const BotonesDeJuego = ({barcoClick, finalizar, barco}) => {
    const {barcosPJ1} = useContext(GameContext);

    const handleFinalizar = () => {
        if (barcosPJ1.every((b) => b.tienePosicion())) finalizar();
        else alert("Faltan barcos por colocar");
    }

    return (
        <>
            <div className="buttons-container">
                <div className="buttons">
                    <div><img prop="" style={{marginRight: "3.4rem"}} src={rotateSVG} className="button rotar" onClick={()=>{barco.orientacion = !barco.orientacion}}/> </div>   
                    <div>
                    <img prop="" src={submarinoSVG} className="button" onClick={()=>barcoClick(barcosPJ1[2])}/>
                    <img prop="" src={cruceroPNG} className="button" onClick={()=>barcoClick(barcosPJ1[1])}/>
                    </div>
                    <div>
                    <img prop="" src={lanchaSVG} className="button" onClick={()=>barcoClick(barcosPJ1[3])}/>
                    <img prop="" src={portaavionesSVG} className="button" onClick={()=>barcoClick(barcosPJ1[0])}/>
                    </div>
                    <div><img prop="" src={finalizarSVG} className="button finalizar"  onClick={()=>handleFinalizar()} />   </div> 
                </div>
            </div>
        </>
    )
}

export default BotonesDeJuego;