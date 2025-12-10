document.addEventListener('DOMContentLoaded', function() {

    // 1. FUNCIONALIDAD DEL MENÚ DE HAMBURGUESA (Móvil)
    const menuButton = document.querySelector('.menu-hamburguesa');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            // Alternar la clase 'activo' en el menú (para mostrar/ocultar)
            navMenu.classList.toggle('activo');

            // Cambiar el icono de hamburguesa a 'X' (cruz)
            const icon = menuButton.querySelector('i');
            if (navMenu.classList.contains('activo')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // 'fa-times' es el icono de cruz en Font Awesome
                menuButton.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Opcional: Cerrar menú al hacer click en un enlace
        const menuLinks = document.querySelectorAll('#nav-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('activo')) {
                    navMenu.classList.remove('activo');
                    menuButton.querySelector('i').classList.add('fa-bars');
                    menuButton.querySelector('i').classList.remove('fa-times');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 2. FUNCIONALIDAD DE LA GALERÍA (Filtros y Paginación)
    const filterButtons = document.querySelectorAll('.botonesTipoDiseños .button');
    const galleryItems = document.querySelectorAll('.imagenesMuestra .imagen-galeria');
    
    // Función de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Desactivar todos los botones y activar el actual
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();

            // 2. Filtrar elementos (simulado, se necesita más lógica real de filtrado)
            galleryItems.forEach(item => {
                // Aquí deberías tener una clase o atributo de datos en cada 'imagen-galeria'
                // para saber a qué categoría pertenece (ej: data-category="arquitectura")
                
                // SIMULACIÓN: Mostrar todos si es "todos", sino simular ocultar/mostrar
                if (filter === 'todos') {
                    item.style.display = 'block';
                } else {
                    // Lógica real: item.dataset.category === filter ? 'block' : 'none';
                    // Por ahora, solo simulación visual simple:
                    if (Math.random() > 0.4 || filter === 'arquitectura') { // Simula un filtro
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            // Opcional: Llamar a la función de paginación después del filtro
            updatePagination(1);
        });
    });
    
    // Función de paginación (simulación)
    const paginationLinks = document.querySelectorAll('.paginacion a');
    const pageNumbers = document.querySelectorAll('.paginacion .pag-number, .paginacion .page-number');

    function updatePagination(newPage) {
        // Lógica de paginación simulada: Actualiza el botón activo
        pageNumbers.forEach(page => page.classList.remove('active'));
        const targetPage = document.querySelector(`.paginacion [class*="pag-number"]:nth-child(${newPage + 1})`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        // Lógica real: Mostrar/ocultar los elementos de la galería según la página
    }

    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lógica para actualizar la página actual
            let currentPage = parseInt(document.querySelector('.paginacion .active').textContent);
            
            if (this.classList.contains('next')) {
                updatePagination(currentPage < 2 ? currentPage + 1 : currentPage);
            } else if (this.classList.contains('prev')) {
                updatePagination(currentPage > 1 ? currentPage - 1 : currentPage);
            } else {
                updatePagination(parseInt(this.textContent));
            }
        });
    });

    // 3. FUNCIONALIDAD DEL NEWSLETTER (Formulario básico)
    const newsletterButton = document.querySelector('.suscripcion button');
    const newsletterInput = document.getElementById('tuEmail');

    if (newsletterButton && newsletterInput) {
        newsletterButton.addEventListener('click', function() {
            const email = newsletterInput.value;
            const validEmail = /\S+@\S+\.\S+/; // Regex simple para validación

            if (validEmail.test(email)) {
                // Simulación de envío exitoso
                alert(`¡Gracias por suscribirte, ${email}! Recibirás nuestras novedades.`);
                newsletterInput.value = ''; // Limpiar campo
            } else {
                // Mensaje de error
                alert('Por favor, ingresa un correo electrónico válido.');
                newsletterInput.focus();
            }
        });
    }
    // 4. ANIMACIÓN DE SCROLL (Scroll Suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Solo aplicar a enlaces de la misma página (como #galeria, #servicios)
            if (this.getAttribute('href').length > 1) {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
