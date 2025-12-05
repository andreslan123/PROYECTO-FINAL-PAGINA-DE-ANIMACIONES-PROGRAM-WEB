document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const btnSuscribir = document.getElementById('btn-suscribir');
    const inputEmail = document.getElementById('tuEmail');
    const messageContainer = document.getElementById('newsletter-message');

    /**
     * FUNCIÓN 1: Controla la apertura y cierre del menú de navegación móvil.
     */
    menuHamburguesa.addEventListener('click', () => {
        // Alterna la clase 'nav-open' para mostrar/ocultar el menú
        navMenu.classList.toggle('nav-open');
        const isExpanded = navMenu.classList.contains('nav-open');
        menuHamburguesa.setAttribute('aria-expanded', isExpanded);
        
        // Cambiar el icono de la hamburguesa (bars) a una 'X' (times) y viceversa
        const icon = menuHamburguesa.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    

});