import { createContext, useEffect, useState } from "react";
import createTable from "./createTable";
import useComputadoraMovimientos from "./useComputadoraMovimientos";
import useMovimientosBarcos from "./useMovimientosBarcos";


export const GameContext = createContext(null);

const GameProvider = ({ children }) => {



    const [tablePj1, setTablePj1] = useState(createTable());
    const [tablePj2, setTablePj2] = useState(createTable());
    const [casillaAtacadaPJ1, setCasillaAtacadaPJ1] = useState(null);
    const [casillaAtacadaPJ2, setCasillaAtacadaPJ2] = useState(null);
    const [barcosPJ1, setBarcosPJ1] = useState([]);
    const [turno, setTurno] = useState(true);
    const [partidaFinalizada, setPartidaFinalizada] = useState({ganador: null});
    const [barcoHundido, setBarcoHundido] = useState(null);
    const {verificarSiHayBarco, putShip, eliminarBarcoDeTablero} = useMovimientosBarcos();
    const {comenzarComputadora, computadoraAttack,
       barcoComputadora, setBarcoComputadora, reiniciarComputadora} = useComputadoraMovimientos(tablePj2, tablePj1, setCasillaAtacadaPJ1, setBarcoHundido);
   

    const resetGame = () => {
        setTablePj1(createTable());
        setTablePj2(createTable());
        setCasillaAtacadaPJ1(null);
        setCasillaAtacadaPJ2(null);
        setBarcoComputadora([]);
        setBarcosPJ1([]);
        setTurno(true);
        reiniciarComputadora();
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

    const pj1Attack = (x, y, fun) => {
      if(tablePj2[x][y] == null){
        tablePj2[x][y] = "marcado"
          fun(false);
          setCasillaAtacadaPJ2({x,y,golpe: false});
          siguienteTurno()
      }else if(tablePj2[x][y] == "marcado"){
        alert("ya atacaste ahí");}
      else if(tablePj2[x][y].atacado == 1){
        alert("ya atacaste ahí");}
      else {
        tablePj2[x][y].atacado = 1;
        fun(true);
        tablePj2[x][y].ship.atacarBarco();
        setCasillaAtacadaPJ2({x,y,golpe: true});
        if (tablePj2[x][y].ship.estaHundido()) {
          alert(tablePj2[x][y].ship.tipo == "lancha"? `hundiste la ${tablePj2[x][y].ship.tipo} enemiga`: `hundiste el ${tablePj2[x][y].ship.tipo} enemigo`);
          setBarcoHundido({tipo : tablePj2[x][y].ship.tipo, jugador: "pj1"});

        }
        siguienteTurno()
      }
    }

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