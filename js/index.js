import { Producto, inicializarProductos, filtroCartaProducto, cantidadProductosPedido, renderValorPedido, sumarPedido } from "./clases.js";

let opcionBienvenida = 0;
let confirmaPedido = false;
let cartaEntradas = '';
let arrayPedido = JSON.parse(localStorage.getItem("pedido")) || [];
let idProducto = 1;
// let idPedido = 1;

const arrayCartaRestaurante = [];


inicializarProductos(arrayCartaRestaurante, idProducto)
cantidadProductosPedido(arrayPedido);
renderValorPedido(arrayPedido);

const buttonEntrada = document.querySelector("#button-entrada");
buttonEntrada.addEventListener("click", () => {
    // app.innerHTML = "";
    selectProductos("entrada");
})

const buttonRapidas = document.querySelector("#button-rapida");
buttonRapidas.addEventListener("click", () => {
    // app.innerHTML = "";
    selectProductos("rapida");

})

const buttonBebidas = document.querySelector("#button-bebida");
buttonBebidas.addEventListener("click", () => {
    // app.innerHTML = "";
    selectProductos("bebida");
})

const buttonPedido = document.querySelector("#ver-Pedido");
buttonPedido.addEventListener("click", () => {
    // app.innerHTML = "";
    selectProductos("pedido");
})

const buttonConfirma = document.querySelector("#confirma-pedido");
buttonConfirma.addEventListener("click", () => {
    // app.innerHTML = "";
    renderPedido(arrayPedido);
    arrayPedido = [];
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);
    localStorage.removeItem("pedido");
})


function renderProductos(tipoProducto, arrayProductos, isPedido) {

    const contenedorTitulo = document.querySelector("#tituloTipoProducto");
    const contenedorProductos = document.querySelector("#app");
    contenedorProductos.innerHTML = "";
    contenedorTitulo.innerHTML = "";

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

function renderPedido(arrayPedido) {
    const contenedorTitulo = document.querySelector("#tituloTipoProducto");
    const contenedorProductos = document.querySelector("#app");
    contenedorProductos.innerHTML = "";
    contenedorTitulo.innerHTML = "";

    const tituloTipoProducto = document.createElement("P");
    tituloTipoProducto.classList.add("titulo-contenedor");

    if (arrayPedido.length > 0) {
        console.log("Array pedido True")
    } else {
        console.log("Array pedido False")
    }
    arrayPedido.length > 0 ? tituloTipoProducto.innerText = `Su pedido se confirmo correctamente, el valor total a pagar es de ${sumarPedido(arrayPedido)}` : tituloTipoProducto.innerText = `Estimado cliente usted aun no ha realizado ningun pedido`;

    contenedorTitulo.appendChild(tituloTipoProducto);
    console.log(arrayPedido);

    arrayPedido.forEach(element => {
        const productosConfirma = document.createElement("div");
        productosConfirma.classList.add("container", "text-center", "container-producto");
        productosConfirma.innerHTML = `
                        <div class="row align-items-end">
                            <div class="col-3 confirma-divImg">
                                <img src="${element.src}" alt="${element.producto}">
                            </div>
                            <div class="col-4 confirma-divProducto">
                                <span>${element.producto}</span>
                            </div>
                            <div class="col-5 confirma-divPrecio">
                                <span>$${element.precio}</span>
                            </div>
                        </div>      
        `
        contenedorProductos.appendChild(productosConfirma);
    })

    const buttonVolver = document.createElement("div");
    buttonVolver.innerHTML = `<a class= "button-volver" href="./index.html">Volver</a>`
    contenedorProductos.appendChild(buttonVolver);
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
    renderProductos(tipoProducto, arrayProductos, pedido);
}

function agregarPedido(producto) {
    arrayPedido.push(producto);
    localStorage.setItem("pedido", JSON.stringify(arrayPedido))
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);
}

function eliminarPedido(prodcuto, arrayPedido) {
    let index = arrayPedido.indexOf(prodcuto);
    index != -1 && arrayPedido.splice(index, 1);
    localStorage.removeItem("pedido");
    localStorage.setItem("pedido", JSON.stringify(arrayPedido));
    selectProductos("pedido");
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);
}






