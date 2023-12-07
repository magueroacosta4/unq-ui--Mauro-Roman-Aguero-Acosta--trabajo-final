import "../styles/Casillas.css";

const Casilla = ({onClick, position, id}) => {

    const handleClick = () => {
        onClick(position);
    }

    return (
        <div id={id} onClick={()=>handleClick()} className="casilla">

        </div>
    );
}

export default Casilla;