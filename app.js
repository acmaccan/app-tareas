// Importamos
require('colors');

const { guardarDB, 
        leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        mostrarListadoChecklist,
        confirmar } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

// Construimos nuestro main
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();
    if(tareasDB){
        // Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        // Imprimir el menú
        opt = await inquirerMenu();
        
        switch(opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case'3': // Listar pendientes
                tareas.listarPendientesCompletadas(true);
                break;

            case'4': // Listar completadas
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6': // Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);

                // Confirmación para borrar
                if(id !== '0'){ // Opción 0 Cancelar
                    const ok = await confirmar('¿Estás seguro?');

                    // Si ok
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;

        }
        
        // Guardar en DB - Qué mando a guardar?
        guardarDB(tareas.listadoArr);

        // Agregamos una pausa
        await pausa();

      // Mientras la opción elegida no sea 0, se seguirá ejecutando
    } while (opt !== '0');
    
}

// Ejecutamos el main
main();