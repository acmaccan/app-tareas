const Tarea = require("./tarea");

class Tareas {
    _listado = {
        'abc': 123
    };

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    };

    constructor() {
        this._listado = {};
        // La indico como privada, es sólo convención, no la hace privada
        // Determino el tipo, podría hacerlo 
        // por arreglo, pero complica. Lo hacemos como obj
    };

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    };

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto(){
        // Hacemos un forEach que recorra el arreglo de tareas
        // Si le sumamos 1 al index, nos da el total de tareas
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            
            const estado = (completadoEn)
                           ? 'Completada'.green
                           : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }
    
    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador = 0;

        this.listadoArr.forEach( tarea => {
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn)
                           ? 'Completada'.green
                           : 'Pendiente'.red;
            
            if (completadas) {
                if(completadoEn){
                    // Mostrar completadas
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if(!completadoEn){
                    // Mostrar pendientes
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
                          
                           
            
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;