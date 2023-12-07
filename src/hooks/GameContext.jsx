import { createContext, useEffect, useState } from "react";
import createTable from "./createTable";
import Barco from "../classes/Barco";
import { tab } from "@testing-library/user-event/dist/tab";


export const GameContext = createContext(null);

const GameProvider = ({ children }) => {



    const [tablePj1, setTablePj1] = useState(createTable());
    const [tablePj2, setTablePj2] = useState(createTable());
    const [casillaAtacadaPJ1, setCasillaAtacadaPJ1] = useState(null);
    const [casillaAtacadaPJ2, setCasillaAtacadaPJ2] = useState(null);
    const [barcoComputadora] = useState([]);
    const [turno, setTurno] = useState(true);
    const [ataquesDeComputadora] = useState({0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7:[], 8: [], 9: []})
    const [golpeComputadoraX, setGolpeComputadoraX] = useState(null);
    const [golpeComputadoraY, setGolpeComputadoraY] = useState(null);

    const resetGame = () => {
        setTablePj1(createTable());
        setTablePj2(createTable());
      }

    useEffect(() => {
      const atacar = () => {if (!turno) {
        computadoraAttack()
        setTurno(!turno);  
      }}

      const timer = setTimeout(atacar, 500)

      return () => clearTimeout(timer)

    }, [turno])

    const verificarSiHayBarco = (table, x, y, ship) => {
      var hayBarco = false;
      if (ship.orientacion ) {
        for (let i = 0; i < ship.size; i++) {
          hayBarco = hayBarco || table[x][y-i] != null;
      }}else{
        for (let i = 0; i < ship.size; i++) {
          hayBarco = hayBarco || table[x - i][y ] != null;
      }}
   
      return hayBarco;
    }

    const putShip = (table, x, y, ship, fun) => {
        if(table[x][y] == null){
            if(ship.orientacion ){
                if (y+1 - ship.size < 0) alert('El barco no cabe en esa posición');
                  else {
                    if(verificarSiHayBarco(table, x, y,ship)) alert('hay un barco que impide ponerlo ahí');
                    else{
                      for (let i = 0; i < ship.size; i++) {
                        table[x][y-i] = {pos: i, atacado: 0 ,ship: ship};
                        ship.addPosicion({x: x,y: y-i})
                        }
                        fun();
                      }}}
            else{
              if (x+1 - ship.size < 0) alert('El barco no cabe en esa posición');
                  else {
                    if(verificarSiHayBarco(table, x, y,ship)) alert('hay un barco que impide ponerlo ahí');
                    else{
                      for (let i = 0; i < ship.size; i++) {
                        table[x-i][y] = {pos: i, atacado: 0 ,ship: ship};
                        ship.addPosicion({x: x-i,y: y})
                        }
                        fun();
                      }}
            }
        } else alert('Ya hay un barco en esa posición');
    }
    
    const eliminarBarcoDeTablero = (tablero,  ship) => {
        if(ship.getPosicion()[0].x === ship.getPosicion()[1].x){
            for (let i = 0; i < ship.size; i++) {
                tablero[ship.getPosicion()[i].x][ship.getPosicion()[i].y] = null}
            } else{
                for (let i = 0; i < ship.size; i++) {
                    tablero[ship.getPosicion()[i].x][ship.getPosicion()[i].y] = null;
                }
            }
            ship.resetPosicion();
        }

    const computadoraAttack = () => {

        let x;
        let y;

        const ubicacionRandom = () => {
          x = Math.round(Math.random()*9);
          let casillasPosibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
          for (let i =0; ataquesDeComputadora[x].length == 10 && i<10; i++) x = x+1;
          let numerosAusentes = casillasPosibles.filter(num => !ataquesDeComputadora[x].includes(num));
          y = numerosAusentes[Math.floor(Math.random() * numerosAusentes.length)];
        }

        if (golpeComputadoraX) {
          if ( golpeComputadoraY != 9 && !ataquesDeComputadora[golpeComputadoraX].includes(golpeComputadoraY+1) ){
            x = golpeComputadoraX;
            y = golpeComputadoraY+1;
          } else if (golpeComputadoraY != 0 && !ataquesDeComputadora[golpeComputadoraX].includes(golpeComputadoraY-1)) {
            x = golpeComputadoraX;
            y = golpeComputadoraY-1;
          }
          else if (golpeComputadoraY > 2 && !ataquesDeComputadora[golpeComputadoraX].includes(golpeComputadoraY-3) ){
            x = golpeComputadoraX;
            y = golpeComputadoraY-3;
          } 
          else if (golpeComputadoraX != 9 && !ataquesDeComputadora[golpeComputadoraX+1].includes(golpeComputadoraY)) {
            x = golpeComputadoraX+1;
            y = golpeComputadoraY;
          } else if (golpeComputadoraX != 0 && !ataquesDeComputadora[golpeComputadoraX-1].includes(golpeComputadoraY)) {
            x = golpeComputadoraX-1;
            y = golpeComputadoraY;
          }
          else if (golpeComputadoraX > 2 && !ataquesDeComputadora[golpeComputadoraX].includes(golpeComputadoraY-3) ){
            x = golpeComputadoraX-3;
            y = golpeComputadoraY;
          } else ubicacionRandom()
        } else ubicacionRandom();

        if(tablePj1[x][y] == null ){
            setCasillaAtacadaPJ1({x,y,golpe: false});
            ataquesDeComputadora[x].push(y);
        }
        else {
          tablePj1[x][y].ship.atacarBarco();
          setCasillaAtacadaPJ1({x,y,golpe: true});
          ataquesDeComputadora[x].push(y);

          if (tablePj1[x][y].ship.estaHundido()) {
            setGolpeComputadoraX(null);
            setGolpeComputadoraY(null);
          }else {
            setGolpeComputadoraX(x);
            setGolpeComputadoraY(y);
          }          
        }
    }

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
        siguienteTurno()
      }
    }

    const comenzarComputadora = () => {
      
      barcoComputadora.push(new Barco("portaaviones", 4, Math.round(Math.random()) == 1));
      barcoComputadora.push(new Barco("crucero", 4, Math.round(Math.random()) == 1));
      barcoComputadora.push(new Barco("submarino", 4, Math.round(Math.random()) == 1));
      barcoComputadora.push(new Barco("lancha", 2, Math.round(Math.random()) == 1));

      for (let i = 0; i < barcoComputadora.length; i++) {
        let x = Math.round(Math.random() * 9);
        let y = Math.round(Math.random() * 9);
        if (barcoComputadora[i].orientacion) {
          if (y + 1 - barcoComputadora[i].size < 0) i--;
          else {
            if (verificarSiHayBarco(tablePj2, x, y, barcoComputadora[i])) i--;
            else {
              for (let j = 0; j < barcoComputadora[i].size; j++) {
                tablePj2[x][y - j] = { pos: j, atacado: 0, ship: barcoComputadora[i] };
                barcoComputadora[i].addPosicion({ x: x, y: y - j });
              }
            }
          }
        } else {
          if (x + 1 - barcoComputadora[i].size < 0) i--;
          else {
            if (verificarSiHayBarco(tablePj2, x, y, barcoComputadora[i])) i--;
            else {
              for (let j = 0; j < barcoComputadora[i].size; j++) {
                tablePj2[x - j][y] = { pos: j, atacado: 0, ship: barcoComputadora[i] };
                barcoComputadora[i].addPosicion({ x: x - j, y: y });
              }
            }
          }
        }
      }

    } 

    const siguienteTurno = () => {
      setTurno(!turno);
    }

    const data = {turno, siguienteTurno, comenzarComputadora, casillaAtacadaPJ1, casillaAtacadaPJ2,
       verificarSiHayBarco, eliminarBarcoDeTablero, computadoraAttack, pj1Attack, tablePj1, setTablePj1, tablePj2, setTablePj2, resetGame, putShip };

    return (
      <GameContext.Provider value={data}>
        {children}
      </GameContext.Provider>
    );
}

export {GameProvider}
export default GameContext;