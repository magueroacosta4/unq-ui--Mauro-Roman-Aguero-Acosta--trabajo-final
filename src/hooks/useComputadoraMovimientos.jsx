import { useState } from "react";
import Barco from "../classes/Barco";
import movimientosBarcos from "../helper/movimientosBarcos";

const useComputadoraMovimientos = (tablePj2, tablePj1, setCasillaAtacadaPJ1, setBarcoHundido) => {
    const {verificarSiHayBarco} = movimientosBarcos();
    const [ataquesDeComputadora, setAtaquesDeComputadora] = useState({0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7:[], 8: [], 9: []})
    const [golpeComputadoraX, setGolpeComputadoraX] = useState(null);
    const [golpeComputadoraY, setGolpeComputadoraY] = useState(null);
    const [barcoComputadora, setBarcoComputadora] = useState([]);

    const reiniciarComputadora = () => {
        setBarcoComputadora([]);
        setAtaquesDeComputadora({0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7:[], 8: [], 9: []})
        setGolpeComputadoraX(null);
        setGolpeComputadoraY(null);
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
            alert(`hundieron tu ${tablePj1[x][y].ship.tipo}`);
            setBarcoHundido({tipo : tablePj1[x][y].ship.tipo, jugador: "computadora"});

          }else {
            setGolpeComputadoraX(x);
            setGolpeComputadoraY(y);
          }          
        }
    }




    return {comenzarComputadora, computadoraAttack, barcoComputadora, ataquesDeComputadora, golpeComputadoraX,
        golpeComputadoraY, setGolpeComputadoraX, setGolpeComputadoraY, setBarcoComputadora, reiniciarComputadora};
}

export default useComputadoraMovimientos