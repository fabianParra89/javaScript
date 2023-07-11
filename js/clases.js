export class Producto {
    constructor(id, tipoProducto, producto, precio, src) {
        this.id = id;
        this.tipoProducto = tipoProducto;
        this.producto = producto;
        this.precio = precio;
        this.src = src;
    }
}


export function inicializarProductos(arrayCartaRestaurante, idProducto) {
    const entrada1 = new Producto(idProducto++, "entrada", "CANASTA DE EMPANADAS", 8000, "./img/empanadas.png");
    arrayCartaRestaurante.push(entrada1);
    const entrada2 = new Producto(idProducto++, "entrada", "CHICHARRONES APANADOS", 9000, "./img/chicharrones.png");
    arrayCartaRestaurante.push(entrada2);
    const entrada3 = new Producto(idProducto++, "entrada", "TOTOPOS", 9000, "./img/totopos.png");
    arrayCartaRestaurante.push(entrada3);
    const entrada4 = new Producto(idProducto++, "entrada", "CHINCHULINES", 8000, "./img/chinchulines.png");
    arrayCartaRestaurante.push(entrada4);
    const entrada5 = new Producto(idProducto++, "entrada", "QUESADILLAS", 8500, "./img/quesadillas.png");
    arrayCartaRestaurante.push(entrada5);
    const entrada6 = new Producto(idProducto++, "entrada", "DEDITOS DE QUESO", 7000, "./img/deditosQueso.png");
    arrayCartaRestaurante.push(entrada6);
    const rapida1 = new Producto(idProducto++, "rapida", "HAMBURGUESA SENCILLA", 15000, "./img/hamburguesa.png");
    arrayCartaRestaurante.push(rapida1);
    const rapida2 = new Producto(idProducto++, "rapida", "HOT DOG", 14500, "./img/hotDog.png");
    arrayCartaRestaurante.push(rapida2);
    const rapida3 = new Producto(idProducto++, "rapida", "SALCHIPAPA", 14000, "./img/salchipapa.png");
    arrayCartaRestaurante.push(rapida3);
    const rapida4 = new Producto(idProducto++, "rapida", "PIZZA PERSONAL", 14500, "./img/pizza.png");
    arrayCartaRestaurante.push(rapida4);
    const rapida5 = new Producto(idProducto++, "rapida", "BURRITOS", 13000, "./img/burritos.png");
    arrayCartaRestaurante.push(rapida5);
    const rapida6 = new Producto(idProducto++, "rapida", "PICADA MIXTA", 20000, "./img/picada.png");
    arrayCartaRestaurante.push(rapida6);
    const bebida1 = new Producto(idProducto++, "bebida", "LIMONADA", 4000, "./img/limonada.png");
    arrayCartaRestaurante.push(bebida1);
    const bebida2 = new Producto(idProducto++, "bebida", "COCA COLA", 3500, "./img/cocacola.png");
    arrayCartaRestaurante.push(bebida2);
    const bebida3 = new Producto(idProducto++, "bebida", "CERVEZA", 5000, "./img/cerveza.png");
    arrayCartaRestaurante.push(bebida3);
    const bebida4 = new Producto(idProducto++, "bebida", "JUGO NATURAL (fruta del dia)", 4000, "./img/jugoNatural.png");
    arrayCartaRestaurante.push(bebida4);
    const bebida5 = new Producto(idProducto++, "bebida", "COPA DE VINO", 5000, "./img/copaVino.png");
    arrayCartaRestaurante.push(bebida5);
    const bebida6 = new Producto(idProducto++, "bebida", "BOTELLA DE AGUA", 2500, "./img/agua.png");
    arrayCartaRestaurante.push(bebida6);
}


export function filtroCartaProducto(array, tipoProducto) {
    const cartaTipoProdFiltrado = array.filter(
        (el) => {
            return el.tipoProducto === tipoProducto;
        }
    )
    return cartaTipoProdFiltrado;
}


export function cantidadProductosPedido(arrayPedido) {
    const cantidadProductos = document.querySelector("#cantidad-productos");
    cantidadProductos.innerHTML = "";
    cantidadProductos.innerText = arrayPedido.length;
}

export function renderValorPedido(arrayPedido) {
    const valorPedido = document.querySelector("#valor-pedido");
    valorPedido.innerHTML = "";
    valorPedido.innerHTML = "$" + sumarPedido(arrayPedido);
}


export function sumarPedido(arrayPedido) {
    const precioPedido = arrayPedido.reduce((prev, current) => prev + current.precio, 0);
    return precioPedido;
}