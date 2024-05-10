const entrada = `Anteojos de sol del Diego: $230666
Ropero antiguo -> (9 de 10) $14500.6
Sandalias de Sakura Card Captors marca eToys: (12 de 10 estrellas) 1210`;

// Expresiones regulares
const regexNombreYResto = /^([^:->]+)[:->]\s*(.*)/;
const regexValoracion = /\((.+?)\)/;
const regexPrecio = /\$?(\d+(\.\d+)?)/;

function extraerProductos(respuesta) {
    const lineasProductos = respuesta.split("\n");
    const productos = [];

    lineasProductos.forEach(linea => {
        // Buscar coincidencias con la expresión regular para obtener el nombre y el resto de la información
        const match = regexNombreYResto.exec(linea);
        if (!match) return; // Si no hay coincidencias, pasar a la siguiente línea

        // Extraer el nombre y el resto de la información
        const nombreProducto = match[1].trim();
        let resto = match[2].trim();

        // Extraer la valoración si se encuentra
        let valoracion = null;
        const matchValoracion = resto.match(regexValoracion);
        if (matchValoracion) {
            valoracion = matchValoracion[1].trim();
            resto = resto.replace(regexValoracion, '').trim();
        }

        // Extraer el precio
        let precio = null;
        const matchPrecio = resto.match(regexPrecio);
        if (matchPrecio) {
            precio = parseFloat(matchPrecio[1]);
        }

        // Crear un objeto producto con nombre, precio y valoración
        const producto = {nombreProducto, precio, valoracion };

        // Agregar el producto al array de productos
        productos.push(producto);
    });

    // Mostrar los productos en la consola
    console.log("Productos:", productos);
}

// Llamar a la función extraerProductos con la lista de productos como parámetro
extraerProductos(entrada);
