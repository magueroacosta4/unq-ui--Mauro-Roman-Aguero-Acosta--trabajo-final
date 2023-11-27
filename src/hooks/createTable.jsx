

const createTable = () => {

    const matriz = [];

    for (let i = 0; i < 10; i++) {
      matriz.push(new Array(10).fill());
    }

    return matriz;
  
}

export default createTable;