// Arreglo para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];/*sirve para recuperar datos guardados en el navegador y asegurarse de que haya un arreglo listo para usar.*/

// --- Elementos del DOM del Carrito ---
const openCartBtn = document.getElementById('open-cart-btn');/*seleccionar un elemento del HTML y guardarlo en una variable de JavaScript*/
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
    localStorage.setItem('carrito', JSON.stringify(carrito));/*sirve para guardar datos en el navegador de forma que se conserven aunque el usuario cierre la página o el navegador */
}

// 1. Añadir producto al carrito
function agregarProducto(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {//para verificar si el elemento que se hizo clic tiene una clase específica.
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

// ... (Código anterior de carrito.js) ...

// 6. Función para vaciar el carrito después de una compra exitosa
function finalizarCompra() {
    carrito = [];
    guardarCarrito(); // Guarda el arreglo vacío en localStorage
    actualizarCarritoHTML(); // Actualiza la interfaz
}

// ... (Código anterior de carrito.js, incluyendo finalizarCompra) ...

// 7. Configuración del Event Listener para el Formulario
document.addEventListener('DOMContentLoaded', function() {
    // ... (Otros listeners del DOMContentLoaded si los hay) ...

    // Seleccionar el formulario por su ID
    const formularioCompra = document.getElementById('formulario-compra'); 

    if (formularioCompra) {
        formularioCompra.addEventListener('submit', function(e) {
            e.preventDefault(); // Detiene el envío normal
            
            // Si el carrito está vacío, no se envía nada
            if (carrito.length === 0) {
                alert('El carrito está vacío. Añade servicios antes de enviar la solicitud.');
                return;
            }

            // Deshabilitar el botón para evitar envíos múltiples
            const btnEnviar = formularioCompra.querySelector('.btn-enviar');
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'Enviando...';
            
            // 💡 SIMULACIÓN DE ENVÍO DE DATOS AL SERVIDOR (Reemplaza esto con tu código real de Fetch/AJAX)
            console.log("Simulando envío de datos al servidor...");
            
            // Simulación de 2 segundos de latencia y éxito
            setTimeout(() => {
                
                // 🧐 LÓGICA DE ÉXITO (Simulamos que el servidor procesó el pedido)
                const compraExitosa = true; 
                
                if (compraExitosa) { 
                    
                    // 🛒 Vacía el carrito, que era el objetivo
                    finalizarCompra(); 
                    
                    alert('✅ ¡Solicitud enviada con éxito! nos pondremos en contacto pronto.');
                    
                    // Limpiar los campos del formulario
                    formularioCompra.reset(); 
                    
                } else {
                    // Lógica de error simulada o real del servidor
                    alert('❌ Error al enviar la solicitud. Inténtalo de nuevo.');
                }

                // Volver a habilitar el botón
                btnEnviar.disabled = false;
                btnEnviar.textContent = 'Enviar Solicitud y Contacto';

            }, 2000); // Espera de 2 segundos simulando la conexión al servidor
            
            // Si usas el código de Fetch anterior, simplemente asegúrate de que el backend responda con éxito.
        });
    }
    
    // Cargar el carrito al iniciar la página (ya está arriba, pero es buena práctica tenerlo aquí)
    actualizarCarritoHTML(); 
});