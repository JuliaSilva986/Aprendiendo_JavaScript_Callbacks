// Datos iniciales en formato JSON
let archivoJSON = JSON.stringify({
    libros: [
        {
            titulo: "El Principito",
            autor: "Antoine de Saint-Exupéry",
            genero: "Fábula",
            disponible: "disponible"
        },
        {
            titulo: "1984",
            autor: "George Orwell",
            genero: "Ciencia ficción",
            disponible: "prestado"
        }
    ]
});

// Simular lectura de un archivo JSON
function leerLibros(callback) {
    setTimeout(() => {
        callback(JSON.parse(archivoJSON));
    }, 1000);
}

// Simular escritura de un archivo JSON
function guardarLibros(datos, callback) {
    setTimeout(() => {
        archivoJSON = JSON.stringify(datos);
        callback();
    }, 500);
}

// Consultar todos los libros
function consultarLibros() {
    leerLibros(datos => {
        console.log(JSON.stringify(datos.libros, null, 2));
        menu();
    });
}

// Agregar un libro
function agregarLibro() {
    let titulo = prompt("Título del libro:");
    let autor = prompt("Autor:");
    let genero = prompt("Género:");

    if (!titulo || !autor || !genero) {
        console.log("Faltan datos del libro.");
        return menu();
    }

    leerLibros(datos => {
        datos.libros.push({
            titulo,
            autor,
            genero,
            disponible: "disponible"
        });

        guardarLibros(datos, () => {
            console.log("Libro agregado correctamente.");
            menu();
        });
    });
}

// Cambiar disponibilidad
function actualizarLibro() {
    let titulo = prompt("¿Qué libro quieres actualizar?");
    if (!titulo) return menu();

    let estado = prompt("Escribe disponible o prestado:");
    if (!estado) return menu();

    estado = estado.toLowerCase().trim();

    if (estado !== "disponible" && estado !== "prestado") {
        console.log("Estado no válido.");
        return menu();
    }

    leerLibros(datos => {
        let libro = datos.libros.find(
            libro => libro.titulo.toLowerCase() === titulo.toLowerCase()
        );

        if (libro) {
            libro.disponible = estado;

            guardarLibros(datos, () => {
                console.log("Disponibilidad actualizada.");
                menu();
            });
        } else {
            console.log("Libro no encontrado.");
            menu();
        }
    });
}

// Menú principal
function menu() {
    let opcion = prompt(
        "1. Consultar libros\n" +
        "2. Agregar libro\n" +
        "3. Actualizar disponibilidad\n" +
        "4. Salir"
    );

    switch (opcion) {
        case "1":
            consultarLibros();
            break;
        case "2":
            agregarLibro();
            break;
        case "3":
            actualizarLibro();
            break;
        case "4":
        case null:
            console.log("Programa finalizado.");
            break;
        default:
            console.log("Opción no válida.");
            menu();
    }
}

menu();