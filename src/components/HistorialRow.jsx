import "../styles/Historial.css";


const HistorialRow = ({row}) => {

    return (
        <div className="historial-row" >
        {
            row.hundido ? <p>¡{row.casilla.jugador == "pj1"? `Hundiste ${row.casilla.tipo == "lancha"? "la lancha enemiga": `el ${row.casilla.tipo} enemigo`}`:
                            `Hundieron tu ${row.casilla.tipo}`
            }!</p>
             : <p>{row.jugador == "pj1"? "Atacaste" : "El enemigo ataco"} en {row.casilla.x}, {row.casilla.y}</p>
        }
    </div>
    )
}

export default HistorialRow;