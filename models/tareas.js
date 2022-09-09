const Tarea = require("./tarea");



class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea ( id = '') {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {


        const listaTareas = this.listadoArr;
        if (listaTareas.length <= 0) {
            console.log('No hay tareas'.green);
        }

        console.log();
        // 1. Descripción :: Completado | Pendiente
        this.listadoArr.forEach((tarea, index) => {

            const idx = `${index + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`);


        });

    }

    listarPendientesCompletadas(completadas = true) {

        const listaTareas = this.listadoArr;
        if (listaTareas.length <= 0) {
            console.log('No hay tareas completadas'.green);
        }

        console.log();
        let contador = 0;
        // 1. Descripción :: Completado | Pendiente
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                ? 'Completada'.green
                : 'Pendiente'.red;

            if ( completadas ) {
                // Muestra completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ ( contador + '.' ).green } ${desc} :: ${completadoEn.green}`);
                }
            } else {
                // Muestra pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ ( contador + '.' ).green } ${desc} :: ${estado}`);
                }
            }


        });
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea =>{

            if ( !ids.includes( tarea.id )) {
               this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}

module.exports = Tareas;