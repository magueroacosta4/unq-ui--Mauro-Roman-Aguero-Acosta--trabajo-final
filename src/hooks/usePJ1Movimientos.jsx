import { useEffect, useState } from "react";
import Barco from "../classes/Barco";



const usePJ1Movimientos = (tablePj2, setCasillaAtacadaPJ2, setBarcoHundido, siguienteTurno) => {

    const [barcosPJ1, setBarcosPJ1] = useState([]);
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
    },[barcosPJ1]);


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

      const reiniciarPj1 = () => {
        setBarcosPJ1([]);
      }

      return {pj1Attack, reiniciarPj1, barcosPJ1}
}

export default usePJ1Movimientos