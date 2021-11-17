// Variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones

const CrearItem = (foto) => {

    let item = {
        descripcion: foto.descripcion,
        archivo: foto.archivo,
        estado: false
    }

    arrayActividades.push(item);

    return item;

}

const GuardarDB = () => {

    localStorage.setItem('Imagen', JSON.stringify(arrayActividades));

    PintarDB();

}

const PintarDB = () => {

    listaActividadesUI.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('Imagen'));

    if (arrayActividades === null) {
        arrayActividades = [];
    } else {

        arrayActividades.forEach(element => {

            if (element.estado) {
                listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.archivo}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
            } else {
                listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.archivo}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
            }
        });

    }
}

const EliminarDB = (foto) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {

        if (elemento.archivo === foto.archivo) {
            indexArray = index;
        }

    });

    arrayActividades.splice(indexArray, 1);
    GuardarDB();

}

const EditarDB = (foto) => {

    let indexArray = arrayActividades.findIndex((elemento) => elemento.archivo === foto.archivo);

    arrayActividades[indexArray].estado = true;

    GuardarDB();

}




// EventListener

formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let archivo = document.querySelector('#actividad').value;
    let descripcion = document.querySelector('#nombre').value;
    const r = {
        descripcion: descripcion,
        archivo: archivo
    }

    CrearItem(r);
    GuardarDB();

    formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {

    e.preventDefault();

    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let texto = e.path[2].childNodes[1].innerHTML;
        if (e.target.innerHTML === 'delete') {
            // Accción de eliminar
            EliminarDB(texto);
        }
        if (e.target.innerHTML === 'done') {
            // Accción de editar
            EditarDB(texto);
        }
    }

});