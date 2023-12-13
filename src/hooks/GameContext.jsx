import { createContext, useEffect, useState } from "react";
import createTable from "../helper/createTable";
import useComputadoraMovimientos from "./useComputadoraMovimientos";
import movimientosBarcos from "../helper/movimientosBarcos";
import usePJ1Movimientos from "./usePJ1Movimientos";


export const GameContext = createContext(null);

const GameProvider = ({ children }) => {



    const [tablePj1, setTablePj1] = useState(createTable());
    const [tablePj2, setTablePj2] = useState(createTable());
    const [casillaAtacadaPJ1, setCasillaAtacadaPJ1] = useState(null);
    const [casillaAtacadaPJ2, setCasillaAtacadaPJ2] = useState(null);
    const [turno, setTurno] = useState(true);
    const [partidaFinalizada, setPartidaFinalizada] = useState({ganador: null});
    const [barcoHundido, setBarcoHundido] = useState(null);
    const {verificarSiHayBarco, putShip, eliminarBarcoDeTablero} = movimientosBarcos();
    const {pj1Attack, reiniciarPj1, barcosPJ1} = usePJ1Movimientos(tablePj2, setCasillaAtacadaPJ2, setBarcoHundido, ()=>setTurno(!turno));
    const {comenzarComputadora, computadoraAttack,
       barcoComputadora, reiniciarComputadora} = useComputadoraMovimientos(tablePj2, tablePj1, setCasillaAtacadaPJ1, setBarcoHundido);
   

    const resetGame = () => {
        reiniciarComputadora();
        reiniciarPj1();
        setTablePj1(createTable());
        setTablePj2(createTable());
        setCasillaAtacadaPJ1(null);
        setCasillaAtacadaPJ2(null);
        setTurno(true);
        setPartidaFinalizada({ganador: null});
        setBarcoHundido(null);
      }

    useEffect(() => {
      if (barcoComputadora.length > 0 && barcoComputadora.every((b) => b.estaHundido())) setPartidaFinalizada({ganador: "pj1"});
      if (barcosPJ1.length > 0 && barcosPJ1.every((b) => b.estaHundido())) setPartidaFinalizada({ganador: "computadora"});
    }, [casillaAtacadaPJ2, casillaAtacadaPJ1])

    useEffect(() => {
      const atacar = () => {if (!turno) {
        computadoraAttack()
        setTurno(!turno);  
      }}

      const timer = setTimeout(atacar, 500)

      return () => clearTimeout(timer)

    }, [turno])

    const siguienteTurno = () => {
      setTurno(!turno);
    }

    const data = {barcoHundido, barcosPJ1, partidaFinalizada, turno, siguienteTurno, comenzarComputadora, casillaAtacadaPJ1, casillaAtacadaPJ2,
       verificarSiHayBarco, eliminarBarcoDeTablero, computadoraAttack, pj1Attack, tablePj1, setTablePj1, tablePj2, setTablePj2, resetGame, putShip };

    return (
      <GameContext.Provider value={data}>
        {children}
      </GameContext.Provider>
    );
}

export {GameProvider}
export default GameContext;