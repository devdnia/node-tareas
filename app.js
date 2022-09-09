require('colors');
const {
    guardarDB,
    leerDB,
    cargarTareasFromArray,
    listadoCompleto
} = require('./helpers/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {

        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                // Listar tareas
                tareas.listadoCompleto();
                break;

            case '3':
                // Listar tareas completas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                // Completar tareas
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                // Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    // Preguntar si está seguro borrar Tarea
                    const ok = await confirmar('¿ Está seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.blue);
                    }
                }
                break;

        }

        guardarDB(tareas.listadoArr);

        await pausa();


    } while (opt !== '0');




}

main();