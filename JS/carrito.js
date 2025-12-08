// Arreglo para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// --- Elementos del DOM del Carrito ---
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartSubtotalSpan = document.getElementById('cart-subtotal');
const cartCountSpan = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const serviciosContainer = document.querySelector('.servicios');

// --- Funciones de Lógica del Carrito ---

// Guarda el carrito en el almacenamiento local del navegador
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// 1. Añadir producto al carrito
function agregarProducto(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const servicioArticle = e.target.closest('.servicio');
        
        const productoInfo = {
            id: servicioArticle.dataset.id,
            nombre: servicioArticle.dataset.nombre,
            // Aseguramos que el precio sea un número flotante
            precio: parseFloat(servicioArticle.dataset.precio),
            cantidad: 1,
        };

        const existe = carrito.find(p => p.id === productoInfo.id);

        if (existe) {
            // Si ya existe, solo incrementa la cantidad
            existe.cantidad++;
        } else {
            // Si no existe, lo agrega como nuevo
            carrito.push(productoInfo);
        }

        guardarCarrito();
        actualizarCarritoHTML();
    }
}

// 2. Eliminar un producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('remove-item-btn')) {
        const productoId = e.target.dataset.id;
        
        // El método filter crea un nuevo arreglo sin el producto con ese ID
        carrito = carrito.filter(producto => producto.id !== productoId);

        guardarCarrito();
        actualizarCarritoHTML();
    }
}

// 3. Vaciar completamente el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        actualizarCarritoHTML();
    }
}

// 4. Muestra el carrito de compras en el HTML (Renderizado)
function actualizarCarritoHTML() {
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        // Mostrar mensaje si el carrito está vacío
        const mensajeVacio = document.createElement('li');
        mensajeVacio.classList.add('empty-cart-message');
        mensajeVacio.textContent = 'Tu carrito está vacío.';
        cartItemsContainer.appendChild(mensajeVacio);
        checkoutBtn.disabled = true;
        clearCartBtn.disabled = true;
    } else {
        // Recorrer el carrito y generar el HTML
        carrito.forEach(producto => {
            const { nombre, precio, cantidad, id } = producto;
            
            // Calcular el subtotal del producto
            const costoProducto = precio * cantidad;
            subtotal += costoProducto; // Acumular al subtotal
            totalItems += cantidad; // Contar todos los artículos

            const nuevoElemento = document.createElement('li');
            nuevoElemento.innerHTML = `
                <span>${nombre} (${cantidad})</span>
                <span>
                    <strong>${costoProducto.toFixed(2)} bs</strong>
                    <button class="remove-item-btn" data-id="${id}">X</button>
                </span>
            `;
            
            cartItemsContainer.appendChild(nuevoElemento);
        });
        checkoutBtn.disabled = false;
        clearCartBtn.disabled = false;
    }

    // Actualizar los totales y el contador de ítems
    cartSubtotalSpan.textContent = subtotal.toFixed(2);
    cartTotalSpan.textContent = subtotal.toFixed(2); 
    cartCountSpan.textContent = totalItems;

    // Actualizar el valor del input de presupuesto en el formulario de pedido
    const presupuestoInput = document.getElementById('presupuesto-estimado');
    if (presupuestoInput) {
        presupuestoInput.value = subtotal.toFixed(2);
    }
}

// 5. Función de Pago
function procederAlPago() {
    if (carrito.length > 0) {
        // Mostrar alerta de confirmación
        alert(`Total a pagar: ${cartTotalSpan.textContent} bs. Redirigiendo al formulario de contacto/pago...`);
        cartModal.classList.remove('open');
        // Redirigir a la sección de formulario
        window.location.href = '#pedido-compra'; 
    } else {
        alert('El carrito está vacío.');
    }
}

// --- Event Listeners ---

// 1. Escuchar los clics en los botones de "Añadir al Carrito"
serviciosContainer.addEventListener('click', agregarProducto);

// 2. Escuchar los clics en los botones de "Eliminar" (dentro de la lista del carrito)
cartItemsContainer.addEventListener('click', eliminarProducto);

// 3. Botones del Modal
openCartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

clearCartBtn.addEventListener('click', vaciarCarrito);

checkoutBtn.addEventListener('click', procederAlPago);

// Cargar el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', actualizarCarritoHTML);