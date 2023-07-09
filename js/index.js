
let opcionBienvenida = 0;
let confirmaPedido = false;
let cartaEntradas = '';
let pedido = [];
let idProducto = 1;

const arrayCartaRestaurante = [];

class Producto{
    constructor(id, tipoProducto, producto, precio, src){
        this.id = id;
        this.tipoProducto = tipoProducto;        
        this.producto = producto;        
        this.precio = precio;        
        this.src = src;
    }
}



const entrada1 = new Producto(idProducto++, "entrada", "CANASTA DE EMPANADAS", 8000, "./img/empanadas.png" );
arrayCartaRestaurante.push(entrada1);
const entrada2 = new Producto(idProducto++, "entrada", "CHICHARRONES APANADOS", 9000, "./img/chicharrones.png");
arrayCartaRestaurante.push(entrada2);
const entrada3 = new Producto(idProducto++, "entrada", "TOTOPOS", 9000, "./img/totopos.png");
arrayCartaRestaurante.push(entrada3);
const rapida1 = new Producto(idProducto++, "rapida", "HAMBURGUESA SENCILLA", 15000, "./img/totopos.png");
arrayCartaRestaurante.push(rapida1);
const rapida2 = new Producto(idProducto++, "rapida", "HOT DOG", 13000, "./img/totopos.png");
arrayCartaRestaurante.push(rapida2);
const rapida3 = new Producto(idProducto++, "rapida", "SALCHIPAPA", 12000, "./img/totopos.png");
arrayCartaRestaurante.push(rapida3);
const bebida1 = new Producto(idProducto++, "bebida", "LIMONADA", 4000, "./img/totopos.png");
arrayCartaRestaurante.push(bebida1);
const bebida2 = new Producto(idProducto++, "bebida", "COCA COLA", 3500, "./img/totopos.png");
arrayCartaRestaurante.push(bebida2);
const bebida3 = new Producto(idProducto++, "bebida", "CERVEZA", 5000, "./img/totopos.png");
arrayCartaRestaurante.push(bebida3);

console.log(arrayCartaRestaurante);
// menuInicial();
// if (confirmaPedido) {
//     alert("Su pedido se confirmo correctamente el valor a pagar es de $" + sumarPedido(pedido) + " COP");
// } else {
//     alert("Gracias por utilizar nuestros servicios");
// }


function menuInicial() {
    while (opcionBienvenida !== 9) {
        opcionBienvenida = parseInt(prompt("Bienvenido a su restaurante-Bar \n seleccione la opcion que desea realizar\n 1.Agregar al pedido\n 2.Confirmar pedido \n 3.Modificar pedido\n 9.salir"));
        switch (opcionBienvenida) {
            case 1:
                agregarPedido();
                break;
            case 2:
                confirmaPedido = confirmarPedido();
                break;
            case 3:
                modificarPedido();
                break;
            default:
                if (opcionBienvenida !== 9) {
                    alert("estimado usuari@ por favor Seleccione una opcion valida");
                }
                break;
        }

        if (confirmaPedido) {
            break;
        }
    }
}

function agregarPedido() {

    let opcionTipoProducto = parseInt(prompt(
        "Seleccione la opcion de la cual desea realizar el pedido \n" +
        "1.Entradas \n" +
        "2.Comidas rapidas \n" +
        "3.Bebidas \n"
    ));

    switch (opcionTipoProducto) {
        case 1:
            let entradas = productos(cartaRestaurante, 'entrada');
            carta = filtroCartaProducto(cartaRestaurante, 'entrada', 'MENU DE ENTRADAS');
            let opcionEntrada = parseInt(prompt(carta));
            hacerPedido(entradas, opcionEntrada);

            break;
        case 2:
            let comidasRapidas = productos(cartaRestaurante, 'rapida');
            carta = filtroCartaProducto(cartaRestaurante, 'rapida', 'MENU DE COMIDAS RAPIDAS');
            let opcionComidasRapidas = parseInt(prompt(carta));
            hacerPedido(comidasRapidas, opcionComidasRapidas);
            break;

        case 3:
            let bebidas = productos(cartaRestaurante, 'bebida');
            carta = filtroCartaProducto(cartaRestaurante, 'bebida', 'MENU DE BEBIDAS');
            let opcionbebidas = parseInt(prompt(carta));
            hacerPedido(bebidas, opcionbebidas);
            break;
        default:
            alert("estimado usuari@ por favor Seleccione una opcion valida");
            agregarPedido();
            break;
    }

}

function confirmarPedido() {
    let _confirmoPedido = false;
    const precioPedido = sumarPedido(pedido);

    if (pedido.length > 0) {
        let productosPedidos = 'PEDIDO REALIZADO \n'
        while (!_confirmoPedido) {

            for (let i = 0; i < pedido.length; i++) {
                productosPedidos = productosPedidos + pedido[i].producto + ' ............ ' + pedido[i].precio + '\n'
            }
            productosPedidos = productosPedidos + 'Costo Total ................... ' + precioPedido + '\n'
            opcionConfirmar = parseInt(prompt(productosPedidos +
                "\n Desea confirmar el pedido \n" +
                "1.Si \n" +
                "2.No "));
            switch (opcionConfirmar) {
                case 1:
                    _confirmoPedido = true;
                    break;
                case 2:
                    _confirmoPedido = false;
                    break;
                default:
                    alert("estimado usuari@ por favor Seleccione una opcion valida");
                    break;
            }
            if (opcionConfirmar === 2) {
                break;
            }
        }
        return _confirmoPedido;

    } else {
        _confirmoPedido = false;
        alert("estimado usuari@, usted no ha realizado ningun pedido aun");
    }
}

function sumarPedido(arrayPedido) {
    const precioPedido = arrayPedido.reduce((prev, current) => prev + current.precio, 0);
    return precioPedido;
}


function productos(array, tipoProducto) {
    const productos = array.filter(
        (el) => {
            return el.tipoProducto === tipoProducto;
        }
    )
    return productos
}
function filtroCartaProducto(array, tipoProducto, tituloTipoProducto) {
    const cartaTipoProdFiltrado = array.filter(
        (el) => {
            return el.tipoProducto === tipoProducto;
        }
    )
    let cartaProductos = tituloTipoProducto + '\n';
    for (let i = 0; i < cartaTipoProdFiltrado.length; i++) {
        cartaProductos = cartaProductos + (i + 1) + '-' + cartaTipoProdFiltrado[i].producto + '........................' + cartaTipoProdFiltrado[i].precio + '\n';
    }
    return cartaProductos;
}

function hacerPedido(arrayProd, opcionCarta) {
    switch (opcionCarta) {
        case 1:
            pedido.push(arrayProd[0]);
            break;
        case 2:
            pedido.push(arrayProd[1]);
            break;
        case 3:
            pedido.push(arrayProd[2]);
            break;
        default:
            alert("estimado usuari@ por favor Seleccione una opcion valida");
            agregarPedido();
            break;
    }
}

function modificarPedido() {
    if (pedido.length > 0) {
        let opcionEliminar = 0;
        let productosPedidos = 'Seleccione la opción que desea eliminar del Pedido \n'
        for (let i = 0; i < pedido.length; i++) {
            productosPedidos = productosPedidos + (i + 1) + ' - ' + pedido[i].producto + ' ............ ' + pedido[i].precio + '\n'
        }
        opcionEliminar = parseInt(prompt(productosPedidos));

        if (opcionEliminar > 0 && opcionEliminar <= pedido.length ) {
            let productoEliminado = pedido[opcionEliminar-1];
            pedido.splice((opcionEliminar - 1), 1);
            alert(productoEliminado.producto + ', se ha eliminado correctamente del pedido');
        } else {
            alert('estimado usuari@, usted no ha seleccionado un producto valido para eliminar');
            modificarPedido();
        }
        

    } else {
        alert("estimado usuari@, usted no ha realizado ningun pedido aun");
    }

}