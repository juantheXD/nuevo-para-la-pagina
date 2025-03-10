document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        let images = carousel.querySelectorAll("img");
        let prevButton = carousel.querySelector(".prev");
        let nextButton = carousel.querySelector(".next");
        let index = 0;

        if (images.length > 0) {
            images[index].classList.add("active");

            // Cambio automático cada 3 segundos
            let autoChange = setInterval(() => {
                changeImage(1);
            }, 3000);

            // Función para cambiar imagen manualmente
            function changeImage(direction) {
                images[index].classList.remove("active");
                index = (index + direction + images.length) % images.length;
                images[index].classList.add("active");
            }

            // Botón anterior
            if (prevButton) {
                prevButton.addEventListener("click", () => {
                    clearInterval(autoChange); // Detiene el cambio automático al interactuar
                    changeImage(-1);
                });
            }

            // Botón siguiente
            if (nextButton) {
                nextButton.addEventListener("click", () => {
                    clearInterval(autoChange); // Detiene el cambio automático al interactuar
                    changeImage(1);
                });
            }
        }
    });

    // Ajustar el tamaño del textarea dinámicamente
    const textarea = document.getElementById("mensaje");
    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        });
    }

    // Capturar y mostrar experiencias enviadas con contador
    const form = document.getElementById("form-experiencia");
    const listaExperiencias = document.getElementById("lista-experiencias");
    const contadorExperiencias = document.getElementById("contador-experiencias");
    let contador = 0;

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let nombre = document.getElementById("nombre").value.trim();
            let mensaje = document.getElementById("mensaje").value.trim();

            if (nombre && mensaje) {
                let nuevaExperiencia = document.createElement("div");
                nuevaExperiencia.classList.add("experiencia");
                nuevaExperiencia.innerHTML = `<strong>${nombre}:</strong> <p>${mensaje}</p>`;

                listaExperiencias.appendChild(nuevaExperiencia);

                // Actualizar contador
                contador++;
                contadorExperiencias.textContent = "Experiencias publicadas: " + contador;

                // Limpiar formulario
                document.getElementById("nombre").value = "";
                document.getElementById("mensaje").value = "";
                document.getElementById("mensaje").style.height = "auto";

                // Eliminar mensaje "No hay experiencias publicadas"
                let mensajeInicial = listaExperiencias.querySelector("p");
                if (mensajeInicial) {
                    mensajeInicial.remove();
                }
            }
        });
    }
});
