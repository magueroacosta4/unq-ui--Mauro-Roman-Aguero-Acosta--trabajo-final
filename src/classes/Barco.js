

class Barco {

    #vida;

    #estado = "sano";
    constructor(tipo, size, orientacion) {
        this.tipo = tipo;
        this.orientacion = orientacion;
        this.size = size;
        this.#vida = size;
    }


    atacarBarco() {
        this.#vida--;
        if (this.#vida == 0) {
            this.#estado = "hundido";
            alert("Barco hundido");
        }
    }

    getEstado() {
        return this.#estado;
    }
}

export default Barco;