import Casilla from "./Casilla";
import "../styles/Home.css";

const Tablero = ({ tablero, onClick, idStart }) => {
    

    return (
        <>
            {tablero.map((fila, i) => {
                    return (
                        <div className="fila" key={i}>
                            {
                                fila.map((casilla, j) => {
                                    return ( 
                                        <Casilla onClick={(p)=> onClick(p)} position={{i,j}} id={`${idStart}${i}${j}`} key={j} />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </>

    )
}

export default Tablero;