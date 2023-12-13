
const movimientosBarcos = () => {
    
    const verificarSiHayBarco = (table, x, y, ship) => {
        var hayBarco = false;
        if (ship.orientacion ) {
        for (let i = 0; i < ship.size; i++) {
            hayBarco = hayBarco || table[x][y-i] != null;
        }}else{
        for (let i = 0; i < ship.size; i++) {
            hayBarco = hayBarco || table[x-i][y] != null;
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


    return {verificarSiHayBarco, putShip, eliminarBarcoDeTablero}
}

export default movimientosBarcos