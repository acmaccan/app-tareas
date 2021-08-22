//Archivo en desuso
require('colors');

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('==============================='.magenta);
        console.log('==== Seleccione una opción ====');
        console.log('===============================\n'.magenta);

        console.log(`${'1'.cyan}. Crear tarea`);
        console.log(`${'2'.cyan}. Listar tareas`);
        console.log(`${'3'.cyan}. Listar tareas completadas`);
        console.log(`${'4'.cyan}. Listar tareas pendientes`);
        console.log(`${'5'.cyan}. Completar tarea(s)`);
        console.log(`${'6'.cyan}. Borrar tarea`);
        console.log(`${'0'.cyan}. Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opt) =>{
            readline.close();
            resolve(opt);
        });
    });
}

const pausa = () => {
    return new Promise (resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) =>{
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}