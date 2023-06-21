
let opcionBienvenida = 0;
let confirmaPedido = false;
let cartaEntradas = '';
let pedido = [];

const cartaRestaurante = [
    { tipoProducto: "entrada", producto: "canasta de empanadas", precio: 10000 },
    { tipoProducto: "entrada", producto: "chicharrones apanados", precio: 9000 },
    { tipoProducto: "entrada", producto: "totopos", precio: 9000 },
    { tipoProducto: "rapida", producto: "hamburguesa sencilla", precio: 15000 },
    { tipoProducto: "rapida", producto: "perro caliente sencillo", precio: 13000 },
    { tipoProducto: "rapida", producto: "salchipapa", precio: 12000 },
    { tipoProducto: "bebida", producto: "limonada", precio: 4000 },
    { tipoProducto: "bebida", producto: "Coca cola", precio: 3500 },
    { tipoProducto: "bebida", producto: "Cerveza", precio: 5000 }
];


menuInicial();
if (confirmaPedido) {
    alert("Su pedido se confirmo correctamente el valor a pagar es de $" + sumarPedido(pedido) + " COP");
} else {
    alert("Gracias por utilizar nuestros servicios");
}


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