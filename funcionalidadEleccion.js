document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionamos el formulario (usando el ID que añadimos en el HTML)
    const formularioCompra = document.getElementById('formulario-compra'); 

    if (formularioCompra) {
        formularioCompra.addEventListener('submit', function(e) {
            e.preventDefault(); // Detiene el envío normal (evita que la página se recargue)

            const selectServicio = document.getElementById('servicio-pedido');
            const detallesTextArea = document.getElementById('detalles');
            
            // 2. Lógica para identificar un Proyecto Personalizado
            if (selectServicio.value === 'Personalizado' && detallesTextArea.value.trim() === '') {
                 alert('⚠️ Por favor, describe tu proyecto personalizado en el campo "Detalles de tu Proyecto".');
                 return; // Detiene el envío
            }
            
            // 3. Capturar y enviar datos (SIMULACIÓN)
            
            const formData = new FormData(formularioCompra);
            
            // Aquí deberías colocar tu código para enviar los datos (usando Fetch o AJAX)
            // al servidor (ejemplo: un script de PHP, Node, o un servicio de envío de formularios).
            
            // --- SIMULACIÓN DE ÉXITO ---
            
            console.log("Datos del formulario a enviar:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Muestra mensaje de éxito y limpia el formulario
            alert('✅ Solicitud de presupuesto enviada con éxito! Te contactaremos pronto.');
            
            // 4. Limpia el formulario después del "envío" exitoso
            formularioCompra.reset(); 
        });
    }
});