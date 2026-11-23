
window.addEventListener("load", () => {
    document.body.classList.add("pagina-cargada");
});

const elementos = document.querySelectorAll("section, .card, .hero-content");
const mostrarElemento = (elemento) => elemento.classList.add("visible");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                mostrarElemento(entrada.target);
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach((elemento) => {
        elemento.classList.add("animacion");
        observador.observe(elemento);
    });
} else {
    elementos.forEach(mostrarElemento);
}

document.querySelectorAll(".card").forEach((tarjeta) => {
    const seleccionarTarjeta = () => {
        const seleccionada = tarjeta.classList.toggle("seleccionada");
        tarjeta.setAttribute("aria-pressed", String(seleccionada));
    };

    tarjeta.addEventListener("click", seleccionarTarjeta);
    tarjeta.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            seleccionarTarjeta();
        }
    });
});

const encabezado = document.querySelector("#encabezado");
const botonArriba = document.createElement("button");

botonArriba.type = "button";
botonArriba.className = "boton-arriba";
botonArriba.textContent = "↑";
botonArriba.setAttribute("aria-label", "Volver al inicio");
botonArriba.title = "Volver al inicio";
document.body.appendChild(botonArriba);

window.addEventListener("scroll", () => {
    const bajada = window.scrollY > 80;
    encabezado.style.boxShadow = bajada ? "0 5px 20px #0004" : "none";
    botonArriba.style.display = window.scrollY > 300 ? "block" : "none";
});

botonArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
