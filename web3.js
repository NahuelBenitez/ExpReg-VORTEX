const entrada = `Combo de 15 Tuppers en diversos tamaños = $24899.99 (3.35/5)
Lapicera Birome con entradas de regalo para ver a Taylor Swift: us$350
Buzo "London" marca Persia Hnos. -> (10 estrellas de 10, totalmente inalterado) £199.9
Revólver musical de Frozen: ¥43.29`;

// Expresiones regulares
const regexNombreYResto = /^([^:->]+)[:->]\s*(.*)/;
const regexValoracion = /\((.+?)\)/;

function extraerProductos(respuesta) {
    const lineasProductos = respuesta.split("\n");
    const productos = [];

    lineasProductos.forEach(linea => {
        const { nombre, restoInfo } = obtenerNombreYResto(linea);
        if (!nombre || !restoInfo) return;

        const valoracion = obtenerValoracion(restoInfo);
        const moneda = obtenerMoneda(restoInfo);
        const precio = obtenerPrecio(restoInfo);

        const producto = { nombre, precio, moneda };
        if (valoracion) producto.valoracion = valoracion;

        productos.push(producto);
    });

    console.log("Productos:", productos);
}

function obtenerNombreYResto(linea) {
    const match = regexNombreYResto.exec(linea);
    if (!match) return {};

    const nombre = match[1].trim();
    const restoInfo = match[2].trim();
    return { nombre, restoInfo };
}

function obtenerValoracion(restoInfo) {
    const matchValoracion = restoInfo.match(regexValoracion);
    return matchValoracion ? matchValoracion[1].trim() : null;
}

function obtenerMoneda(restoInfo) {
    if (restoInfo.includes("us$")) return "us$";
    if (restoInfo.includes("£")) return "£";
    if (restoInfo.includes("¥")) return "¥";
    return "$"; // Por defecto, pesos argentinos
}

function obtenerPrecio(restoInfo) {
    const precioString = restoInfo.includes("$") ? restoInfo.split("$")[1] : restoInfo;
    const cleanPriceString = precioString.replace(/[^\d.]/g, ''); // Eliminar caracteres no numéricos, excepto el punto decimal
    const precio = parseFloat(cleanPriceString);
    return isNaN(precio) ? null : precio;
}

extraerProductos(entrada);
