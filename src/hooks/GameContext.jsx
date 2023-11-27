import { createContext, useEffect, useState } from "react";
import createTable from "./createTable";


export const GameContext = createContext(null);

const GameProvider = ({ children }) => {



    const [tablePj1, setTablePj1] = useState(createTable());
    const [tablePj2, setTablePj2] = useState(createTable());

    const resetGame = () => {
        setTablePj1(createTable());
        setTablePj2(createTable());
      }

    const verificarSiHayBarco = (x, y, ship) => {
      var hayBarco = false;
      if (ship.orientacion ) {
        for (let i = 0; i < ship.size; i++) {
          hayBarco = hayBarco || tablePj1[x][y-i] != null;
      }}else{
        for (let i = 0; i < ship.size; i++) {
          hayBarco = hayBarco || tablePj1[x - i][y ] != null;
      }}
   
      return hayBarco;
    }

    const putShip = (x, y, ship, fun) => {
        if(tablePj1[x][y] == null){
            if(ship.orientacion ){
                if (y+1 - ship.size < 0) alert('El barco no cabe en esa posición');
                  else {
                    if(verificarSiHayBarco(x, y,ship)) alert('hay un barco que impide ponerlo ahí');
                    else{
                      for (let i = 0; i < ship.size; i++) {
                        tablePj1[x][y-i] = {pos: i, atacado: 0 ,ship: ship};
                        }
                        fun();
                      }}}
            else{
              if (x+1 - ship.size < 0) alert('El barco no cabe en esa posición');
                  else {
                    if(verificarSiHayBarco(x, y,ship)) alert('hay un barco que impide ponerlo ahí');
                    else{
                      for (let i = 0; i < ship.size; i++) {
                        tablePj1[x-i][y] = {pos: i, atacado: 0 ,ship: ship};
                        }
                        fun();
                      }}
            }
        } else alert('Ya hay un barco en esa posición');
    }
  

    const pj2Attack = (x, y, fun) => {
        if(tablePj1[x][y] == null){
          tablePj1[x][y] = "marcado"
            fun("green");
        }else if(tablePj1[x][y] == "marcado"){
          alert("ya atacaste ahí");}
        else if(tablePj1[x][y].atacado == 1){
          alert("ya atacaste ahí");}
        else {
          tablePj1[x][y].atacado = 1;
          fun("red");
          tablePj1[x][y].ship.atacarBarco();
        }
    }


    const data = {pj2Attack, tablePj1, setTablePj1, tablePj2, setTablePj2, resetGame, putShip };

    return (
      <GameContext.Provider value={data}>
        {children}
      </GameContext.Provider>
    );
}

export {GameProvider}
export default GameContext;