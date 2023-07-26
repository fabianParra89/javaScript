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