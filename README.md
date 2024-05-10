
# EXPRESIONES REGULARES

Estábamos aburridos y planteamos un Web Crawler (Un pequeño software que entra a distintas páginas web y extrae cierta información de las mismas) para Mercado Libre y páginas de compras similares. El mismo nos terminó devolviendo una lista de productos con sus precios y ocasionalmente su puntuación. 
El objetivo que tenemos ahora es; extraer esta información de las distintas respuestas entregadas por este Web Crawler.

Para esto, existen ciertas reglas comunes en la respuesta del Web Crawler; cada conjunto de información de una página se devuelve en una línea separada. Cada línea está compuesta por:
el producto,
una separación por un signo igual (=),
el precio, que puede ser un número entero o decimal y siempre se va a encontrar a la derecha del signo igual,
y la valoración, que no siempre estará disponible, pero cuando se encuentre siempre estará del lado derecho del signo igual y entre paréntesis.
Por ejemplo: "Camisa Azul = 9499.99 (4.3/5)"

Como respuesta, queremos una lista de productos con sus respectivos nombres, precios (Todos con dos decimales) y respectiva valoración en caso de contar con una (Tal cual se encontraban) para las salidas dadas del Web Crawler.

Primer nivel - Ejemplo de Entrada:

Aspiradora=45200
Madera Balsa x 100gr =965 (7 de 10)
Jamón cocido xKg = 4750.75 (42 estrellas de 100)
Camisa Azul marca Polo = 9499.9 (4.3/5)

Ejemplo de Salida:
Productos: [ 
  { nombre: "Aspiradora", precio: 45200.00 }, 
  { nombre: "Madera Balsa x 100gr", precio: 965.00, valoracion: "7 de 10" }
  { nombre: "Jamón cocido xKg", precio: 4750.75, valoracion: "42 estrellas de 100" }
  { nombre: "Camisa Azul marca Polo", precio: 9499.90, valoracion: "4.3/5" }
]
 

##Segundo nivel
Luego de ir viendo diversas respuestas dadas por el Web Crawler, nos dimos cuenta que a veces las separaciones entre el producto y su información adicional las hace con el signo dos puntos (:) y otras veces con una flecha (->) en vez de solo con el signo igual (=).
Adicionalmente, el precio, muchas veces puede venir con el signo pesos ($). 

Por lo tanto, nos gustaría dar soporte a este tipo de respuestas también, incluyendo las anteriores.

Ejemplo de Entrada:

Anteojos de sol del Diego: $230666
Ropero antiguo -> (9 de 10) $14500.6
Sandalias de Sakura Card Captors marca eToys: (12 de 10 estrellas) 1210

Ejemplo de Salida:
Productos: [ 
  { nombre: "Anteojos de sol del Diego", precio: 230666.00 }, 
  { nombre: "Ropero antiguo", precio: 14500.60, valoracion: "9 de 10" },
  { nombre: "Sandalias de Sakura Card Captors marca eToys", precio: 1210.00, valoracion: "12 de 10 estrellas" }
]
 

##Tercer Nivel
A medida que fuimos usando esto, nos dimos cuenta que muchas publicaciones de productos venían en distinta moneda, lo cual mucho de la información que estábamos extrayendo no tenía realmente demasiado sentido. Así que queremos discriminar en qué moneda fue hecha la publicación. 

Por defecto, nos encontramos que el peso argentino es la moneda más común para las publicaciones que estamos extrayendo. Así que en caso de no especificar una moneda, vamos a asumir que la publicación está en pesos argentinos ($). En caso que esté publicado en dólares, siempre se encontrará escrito como us$. El resto de monedas, se incluye su signo como tal. 

Ejemplo de Entrada:
Combo de 15 Tuppers en diversos tamaños = $24899.99 (3.35/5)
Lapicera Birome con entradas de regalo para ver a Taylor Swift: us$350
Buzo "London" marca Persia Hnos. -> (10 estrellas de 10, totalmente inalterado) £199.9
Revólver musical de Frozen: ¥43.29

Ejemplo de Salida: 
Productos: [ 
  { nombre: "Combo de 15 Tuppers en diversos tamaños", precio: 24899.99, moneda: "$", valoracion: "3.35/5" }, 
  { nombre: "Lapicera Birome con entradas de regalo para ver a Taylor Swift", precio: 350.00, moneda: "us$" },
  { nombre: 'Buzo "London" marca Persia Hnos.', precio: 199.90, moneda: "£", valoracion: "10 estrellas de 10, totalmente inalterado" },
  { nombre: "Revólver musical de Frozen", precio: 43.29, moneda: "¥" }
]
