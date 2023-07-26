import { filtroCartaProducto, cantidadProductosPedido, renderValorPedido, sumarPedido } from "./clases.js";

let arrayPedido = JSON.parse(localStorage.getItem("pedido")) || [];
let idProducto = 1;

const arrayCartaRestaurante = [];

fetch("./json/data.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(element => {
            arrayCartaRestaurante.push(element)
        });
    })
cantidadProductosPedido(arrayPedido);
renderValorPedido(arrayPedido);
const buttonEntrada = document.querySelector("#button-entrada");
buttonEntrada.addEventListener("click", () => {
    selectProductos("entrada");
})

const buttonRapidas = document.querySelector("#button-rapida");
buttonRapidas.addEventListener("click", () => {
    selectProductos("rapida");

})

const buttonBebidas = document.querySelector("#button-bebida");
buttonBebidas.addEventListener("click", () => {
    selectProductos("bebida");
})

const buttonPedido = document.querySelector("#ver-Pedido");
buttonPedido.addEventListener("click", () => {

    const app = document.querySelector("#app");
    app.innerHTML = "";
    selectProductos("pedido");
})



function renderProductos(tipoProducto, arrayProductos, isPedido) {
    const contenedorTitulo = document.querySelector("#tituloTipoProducto");
    const contenedorProductos = document.querySelector("#app");
    const contenedorPedidos = document.querySelector("#appPedido");
    contenedorProductos.innerHTML = "";
    contenedorPedidos.innerHTML = ""
        ; contenedorTitulo.innerHTML = "";

    const tituloTipoProducto = document.createElement("h1");
    tituloTipoProducto.classList.add("titulo-contenedor");
    tituloTipoProducto.innerText = tipoProducto.toUpperCase() + "S";

    contenedorTitulo.appendChild(tituloTipoProducto);
    arrayProductos.forEach(element => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
                    <img src="${element.src}" alt="${element.producto}">
                    <div class="info-Producto">
                        <span> ${element.producto} </span>
                        <span> $${element.precio}</span>
                    </div>        
        `

        const buttonCard = document.createElement("button");
        buttonCard.classList.add("button-card");
        isPedido ? buttonCard.innerText = "Eliminar del pedido" : buttonCard.innerText = "Agregar al pedido";
        buttonCard.addEventListener("click", () => {
            isPedido ? eliminarPedido(element, arrayPedido) : agregarPedido(element);
        })

        tarjeta.appendChild(buttonCard);
        contenedorProductos.appendChild(tarjeta);

    });
}

function renderPedido(arrayPedido, isPedido) {
    const contenedorTitulo = document.querySelector("#tituloTipoProducto");
    const contenedorProductos = document.querySelector("#appPedido");
    contenedorProductos.innerHTML = "";
    contenedorTitulo.innerHTML = "";

    const tituloTipoProducto = document.createElement("P");
    tituloTipoProducto.classList.add("titulo-contenedor");

    if (arrayPedido.length > 0) {
        tituloTipoProducto.innerText = `PEDIDO REALIZADO`
        contenedorTitulo.appendChild(tituloTipoProducto);
        arrayPedido.forEach(element => {
            const productosConfirma = document.createElement("div");
            productosConfirma.classList.add("prducto-pedido");
            productosConfirma.innerHTML = `
                        
                            <div class="confirma-divImg" >
                                <img src="${element.src}" alt="${element.producto}">
                            </div>
                            <div class="confirma-divProducto">
                                <span>${element.producto}</span>
                            </div>
                            <div class="confirma-divPrecio">
                                <span>$${element.precio}</span>
                            </div>
                           
        `
            const buttonBorrar = document.createElement("img");
            buttonBorrar.classList.add("button-borra");
            buttonBorrar.src = "./img/borrar.png";
            buttonBorrar.addEventListener("click", () => {
                isPedido ? eliminarPedido(element, arrayPedido) : agregarPedido(element);
            })
            productosConfirma.appendChild(buttonBorrar);
            contenedorProductos.appendChild(productosConfirma);
        })

        const seccionButtonPedidos = document.createElement("div");
        const buttonConfirmar = document.createElement("div");
        const buttonVolver = document.createElement("div");
        const valorPagar = document.createElement("div");

        seccionButtonPedidos.classList.add("container-buttons-pedido");
        valorPagar.classList.add("valor-pagar");
        buttonConfirmar.innerHTML = `<a id="button-confirmar" class= "button-volver" >Confirmar pedido</a>`;
        buttonVolver.innerHTML = `<a class= "button-volver" href="./index.html">Volver</a>`;
        valorPagar.innerHTML = `<span>Total a pagar $${sumarPedido(arrayPedido)}</span>`;
        seccionButtonPedidos.appendChild(buttonConfirmar);
        seccionButtonPedidos.appendChild(buttonVolver);
        contenedorProductos.appendChild(valorPagar);
        contenedorProductos.appendChild(seccionButtonPedidos);


        buttonConfirmar.addEventListener("click", () => {

            confirmacionPedido(arrayPedido);
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: ' Estimado cliente no hay ningun producto en su pedido',
            confirmButtonColor: '#eb7c13',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
}

function selectProductos(tipoProducto) {
    let pedido = false;
    let arrayProductos
    if (tipoProducto === "pedido") {
        pedido = true;
        arrayProductos = arrayPedido;
    } else {
        arrayProductos = filtroCartaProducto(arrayCartaRestaurante, tipoProducto);
    }
    pedido ? renderPedido(arrayProductos, pedido) : renderProductos(tipoProducto, arrayProductos, pedido);
}

function agregarPedido(productoAgregado) {
    let nombreProducto = productoAgregado.producto;
    Toastify({
        text: "Se ha agregado " + productoAgregado.producto + " al pedido",
        duration: 2000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #eb7c13, #e9a740)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
    arrayPedido.push(productoAgregado);
    localStorage.setItem("pedido", JSON.stringify(arrayPedido))
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);

}




function eliminarPedido(prodcutoEliminar, arrayPedido) {

    Swal.fire({
        title: 'Estas seguro?',
        text: "Vas a eliminar " + prodcutoEliminar.producto + " del pedido",
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#eb7c13',
        cancelButtonColor: '#0e0c0d',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si',
        imageUrl: prodcutoEliminar.src,
        imageWidth: 275,
        imageHeight: 183,
        imageAlt: prodcutoEliminar.producto
    }).then((result) => {
        if (result.isConfirmed) {
            let index = arrayPedido.indexOf(prodcutoEliminar);
            index != -1 && arrayPedido.splice(index, 1);
            localStorage.removeItem("pedido");
            localStorage.setItem("pedido", JSON.stringify(arrayPedido));
            selectProductos("pedido");
            cantidadProductosPedido(arrayPedido);
            renderValorPedido(arrayPedido);

            Toastify({
                text: "Se ha eliminado del pedido el producto: " + prodcutoEliminar.producto,
                duration: 2000,
                close: false,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #eb7c13, #e9a740)",
                },
                onClick: function () { } // Callback after click
            }).showToast();

        }
    })

}

function confirmacionPedido(arrayPedido) {


    const contenedorPrincipal = document.querySelector("#appPedido");
    const contenedorTitulo = document.querySelector("#tituloTipoProducto");
    contenedorPrincipal.innerText = "";
    contenedorTitulo.innerText = "";
    document.body.appendChild(contenedorPrincipal);
    document.body.appendChild(contenedorTitulo);
    Swal.fire({
        title: ' Su pedido se ha confirmado correctamente!!!',
        confirmButtonColor: '#eb7c13',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    renderPedido(arrayPedido);
    arrayPedido = [];
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);
    localStorage.removeItem("pedido");
}






