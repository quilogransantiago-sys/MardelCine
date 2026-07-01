/*
 * principal.js — Lógica de la página "Mar del Cine"
 * --------------------------------------------------
 * Propósito: Manejar interacciones y animaciones.
 *
 * Funciones:
 *   - inicializarObservers(): IntersectionObserver para animaciones al scrollear
 *   - inicializarHeader(): sticky header que cambia al hacer scroll
 *   - inicializarMenuMovil(): toggle del menú hamburguesa en móvil
 *   - inicializarScrollSuave(): navegación suave entre secciones
 *   - colocarAnioActual(): año dinámico en el copyright
 */

/* ========== INICIALIZACIÓN ========== */
document.addEventListener("DOMContentLoaded", () => {
    inicializarObservers();
    inicializarHeader();
    inicializarMenuMovil();
    inicializarScrollSuave();
    colocarAnioActual();
});

/* ========== INTERSECTION OBSERVER (ANIMACIONES) ========== */

/**
 * Observa elementos con clases .revelar, .desde-izquierda, .desde-derecha.
 * Al entrar en viewport les añade .visible para disparar la transición CSS.
 */
function inicializarObservers() {
    const elementos = document.querySelectorAll(
        ".revelar, .desde-izquierda, .desde-derecha"
    );

    if (!elementos.length) return;

    const opciones = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    }, opciones);

    elementos.forEach((el) => observador.observe(el));
}

/* ========== HEADER STICKY ========== */

/**
 * Cambia el header según la posición del scroll.
 * - Sin scroll: fondo transparente
 * - Con scroll: fondo sólido con blur + clase .con-fondo
 */
function inicializarHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.classList.add("con-fondo");
        } else {
            header.classList.remove("con-fondo");
        }
    }, { passive: true });
}

/* ========== MENÚ MÓVIL ========== */

/**
 * Toggle del menú hamburguesa en dispositivos móviles.
 * Abre/cierra el nav lateral y bloquea el scroll del body.
 */
function inicializarMenuMovil() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("menuNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const abierto = nav.classList.toggle("abierto");
        document.body.style.overflow = abierto ? "hidden" : "";
        toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });

    const links = nav.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("abierto");
            document.body.style.overflow = "";
            toggle.setAttribute("aria-label", "Abrir menú");
        });
    });
}

/* ========== SCROLL SUAVE ========== */

/**
 * Navegación suave al hacer clic en links internos (#).
 * Calcula offset por el header fijo.
 */
function inicializarScrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (evento) => {
            const destinoId = link.getAttribute("href");
            if (!destinoId || destinoId === "#") return;

            const destino = document.querySelector(destinoId);
            if (!destino) return;

            evento.preventDefault();

            const header = document.getElementById("header");
            const offsetY = header ? header.offsetHeight + 10 : 80;

            const posicion =
                destino.getBoundingClientRect().top +
                window.scrollY -
                offsetY;

            window.scrollTo({
                top: posicion,
                behavior: "smooth"
            });
        });
    });
}

/* ========== AÑO ACTUAL EN FOOTER ========== */

/** Coloca el año actual en el span #anoActual del copyright */
function colocarAnioActual() {
    const span = document.getElementById("anoActual");
    if (span) {
        span.textContent = new Date().getFullYear();
    }
}