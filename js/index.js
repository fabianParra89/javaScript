
let opcionBienvenida = 0;
let confirmaPedido = false;
let valorPagar = 0;
let cuentaOpc1 = 0;
let cuentaOpc2 = 0;
let cuentaOpc3 = 0;
let cuentaOpc4 = 0;
let cuentaOpc5 = 0;

menuInicial();
if (confirmaPedido) {
    alert("Su pedido se confirmo correctamente el valor a pagar es de $" + valorPagar + " COP");
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

    let opcionMenuPedido = parseInt(prompt("Menu del restaurante \n" +
        "Seleccione la opcion que desea agregar al pedido\n" +
        "1.Combo hamburguesa Sencilla .........................$18.000 COP \n" +
        "2.Combo perro caliente sencillo ......................$16.000 COP \n" +
        "3.Salchipapa .........................................$12.000 COP \n" +
        "4.Coca cola ..........................................$ 3.000 COP \n" +
        "5.Limonada ...........................................$ 4.000 COP"));

    switch (opcionMenuPedido) {
        case 1:
            sumarPedido(18000);
            cuentaOpc1 = cuentaOpc1++;
            break;
        case 2:
            sumarPedido(16000);
            cuentaOpc2 = cuentaOpc2++;
            break;
        case 3:
            sumarPedido(12000);
            cuentaOpc3 = cuentaOpc3++;
            break;
        case 4:
            sumarPedido(3000);
            cuentaOpc4 = cuentaOpc4++;
            break;
        case 5:
            sumarPedido(4000);
            cuentaOpc5 = cuentaOpc5++;
            break;
        default:
            alert("estimado usuari@ por favor Seleccione una opcion valida");
            agregarPedido();
            break;
    }

}

function confirmarPedido() {
    let _confirmoPedido = false;
    let opcionConfirmar = 0;
    if (valorPagar === 0) {
        _confirmoPedido = false;
        alert("estimado usuari@, usted no ha realizado ningun pedido aun");
    } else {
        while (!_confirmoPedido) {
            opcionConfirmar = parseInt(prompt("El total a pagar es de " + valorPagar +
                "\n Desea confirmar el pedido \n" +
                "1.Si \n" +
                "2.No "));
            switch (opcionConfirmar) {
                case 1:
                    console.log("ingreso confirmar 1");
                    _confirmoPedido = true;
                    break;
                case 2:
                    _confirmoPedido = false;
                    break;
                default:
                    console.log("default9 " + opcionConfirmar);
                    alert("estimado usuari@ por favor Seleccione una opcion valida");
                    break;
            }
            if (opcionConfirmar === 2) {
                break;
            }
        }

        return _confirmoPedido
    }

}

function sumarPedido(valorPedido) {
    valorPagar = valorPagar + valorPedido;
}