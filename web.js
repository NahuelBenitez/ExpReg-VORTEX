const entrada = `Aspiradora=45200
Madera Balsa x 100gr =965 (7 de 10)
Jamón cocido xKg = 4750.75 (42 estrellas de 100)
Camisa Azul marca Polo = 9499.9 (4.3/5)`;
function webCrawler(respuesta) {
   
    let productosStr = respuesta.split("\n");

   
    let productos = []; // para guardar los prod

    productosStr.forEach(productosStr => {
        
        let partesProducto = productosStr.split("=");///divido el producto despues de los igual
      
        let nombre = partesProducto[0].trim();//obtengo nombre con la primera posicion y quito los espacios

        let precio = parseFloat(partesProducto[1]);//obtengo precio con la 2da posicon y parseo para que sea numero

        let valoracion = null;

        // Comprueba si hay más partes en el producto (si hay valoración)
        if (partesProducto.length > 1) {
            
            let regex = /\(([^)]+)\)/;//exp reg para encontrar parentesis
            
            let parentesis = regex.exec(partesProducto[1]);
            // Si se encuentra una coincidencia (valoración)
            if (parentesis) {
                // Extrae y asigna la valoración
                valoracion = parentesis[1].trim();
             
                
            }
        }

        // Crear objeto de producto y agrego array
        let producto = { nombre, precio };
         // Si tiene valoracion la agrego
         if (valoracion) {
            producto.valoracion = valoracion;
        }
        productos.push(producto);
    });

    
    console.log("Productos:", productos);
}

webCrawler(entrada);
