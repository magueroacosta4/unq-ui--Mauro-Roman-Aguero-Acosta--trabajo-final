import { Link } from "react-router-dom";


const Home = () => {

    /*has una interfaz de menu sobre batalla naval*/
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Batalla Naval</h1>
                </div>
                <div className="col-12">
                    <Link to="/game" className="btn btn-primary">Jugar</Link>
                </div>
            </div>
        </div>


    )
}


export default Home;