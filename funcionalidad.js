document.addEventListener('DOMContentLoaded', function() {
    // =======================================================
    // 1. FUNCIONALIDAD DEL MENÚ DE HAMBURGUESA (Móvil)
    // =======================================================
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

    
});
