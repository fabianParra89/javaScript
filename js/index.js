
let opcionBienvenida = 0;
let confirmaPedido = false;
let cartaEntradas = '';
let arrayPedido = JSON.parse(localStorage.getItem("pedido")) || [];
let idProducto = 1;
// let idPedido = 1;

const arrayCartaRestaurante = [];

class Producto {
    constructor(id, tipoProducto, producto, precio, src) {
        this.id = id;
        this.tipoProducto = tipoProducto;
        this.producto = producto;
        this.precio = precio;
        this.src = src;
    }
}

const entrada1 = new Producto(idProducto++, "entrada", "CANASTA DE EMPANADAS", 8000, "./img/empanadas.png");
arrayCartaRestaurante.push(entrada1);
const entrada2 = new Producto(idProducto++, "entrada", "CHICHARRONES APANADOS", 9000, "./img/chicharrones.png");
arrayCartaRestaurante.push(entrada2);
const entrada3 = new Producto(idProducto++, "entrada", "TOTOPOS", 9000, "./img/totopos.png");
arrayCartaRestaurante.push(entrada3);
const entrada4 = new Producto(idProducto++, "entrada", "CHINCHULINES", 8000, "./img/chinchulines.png");
arrayCartaRestaurante.push(entrada4);
const rapida1 = new Producto(idProducto++, "rapida", "HAMBURGUESA SENCILLA", 15000, "./img/hamburguesa.png");
arrayCartaRestaurante.push(rapida1);
const rapida2 = new Producto(idProducto++, "rapida", "HOT DOG", 13000, "./img/hotDog.png");
arrayCartaRestaurante.push(rapida2);
const rapida3 = new Producto(idProducto++, "rapida", "SALCHIPAPA", 12000, "./img/salchipapa.png");
arrayCartaRestaurante.push(rapida3);
const bebida1 = new Producto(idProducto++, "bebida", "LIMONADA", 4000, "./img/limonada.png");
arrayCartaRestaurante.push(bebida1);
const bebida2 = new Producto(idProducto++, "bebida", "COCA COLA", 3500, "./img/cocacola.png");
arrayCartaRestaurante.push(bebida2);
const bebida3 = new Producto(idProducto++, "bebida", "CERVEZA", 5000, "./img/cerveza.png");
arrayCartaRestaurante.push(bebida3);

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
    }else{
        console.log("Array pedido False")
    }
    arrayPedido.length > 0 ?  tituloTipoProducto.innerText = `Su pedido se confirmo correctamente, el valor total a pagar es de ${sumarPedido(arrayPedido)}`: tituloTipoProducto.innerText = `Estimado cliente usted aun no ha realizado ningun pedido`;
    
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
    // producto.idPedido = idPedido++;
    arrayPedido.push(producto);
    localStorage.setItem("pedido", JSON.stringify(arrayPedido))
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);
}

function eliminarPedido(prodcuto, arrayPedido) {
    console.log(prodcuto);
    let index = arrayPedido.indexOf(prodcuto);
    console.log(index);
    index != -1 && arrayPedido.splice(index, 1);
    localStorage.removeItem("pedido");
    localStorage.setItem("pedido", JSON.stringify(arrayPedido));
    selectProductos("pedido");
    cantidadProductosPedido(arrayPedido);
    renderValorPedido(arrayPedido);
}

function cantidadProductosPedido(arrayPedido) {
    const cantidadProductos = document.querySelector("#cantidad-productos");
    cantidadProductos.innerHTML = "";
    cantidadProductos.innerText = arrayPedido.length;
}

function renderValorPedido(arrayPedido) {
    const valorPedido = document.querySelector("#valor-pedido");
    valorPedido.innerHTML = "";
    valorPedido.innerHTML = "$" + sumarPedido(arrayPedido);
}


function sumarPedido(arrayPedido) {
    const precioPedido = arrayPedido.reduce((prev, current) => prev + current.precio, 0);
    return precioPedido;
}


function filtroCartaProducto(array, tipoProducto) {
    const cartaTipoProdFiltrado = array.filter(
        (el) => {
            return el.tipoProducto === tipoProducto;
        }
    )
    return cartaTipoProdFiltrado;
}

