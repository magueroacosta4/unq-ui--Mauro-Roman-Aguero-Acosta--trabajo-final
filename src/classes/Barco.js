

class Barco {

    #vida;
    #posicion;
    #estado = "sano";
    constructor(tipo, size, orientacion, posicion) {
        this.tipo = tipo;
        this.orientacion = orientacion;
        this.size = size;
        this.#vida = size;
        this.#posicion = []
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

    estaHundido() {
        return this.#estado == "hundido";
    }

    getPosicion() {
        return this.#posicion;
    }

    addPosicion(posicion) {
        this.#posicion.push(posicion);
    }

    tienePosicion() {
        return this.#posicion.length > 0;
    }

    resetPosicion() {
        this.#posicion = [];
    }
}

export default Barco;