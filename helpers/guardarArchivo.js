// Importamos fileSystem propio de Node
const fs = require('fs');

const archivo = './db/data.json';

// Para guardar las tareas en un json
const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));    
}

// Listar tareas guardadas
const leerDB = () => {
    // Si no existiera el archivo
    if(!fs.existsSync(archivo)){
        return null;
    }

    // Si existiera
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}

//Borrar tarea


// Exportamos las funciones para utilizar en app
module.exports = {
    guardarDB,
    leerDB
}