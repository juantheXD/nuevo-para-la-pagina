document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        let images = carousel.querySelectorAll("img");
        let prevButton = carousel.querySelector(".prev");
        let nextButton = carousel.querySelector(".next");
        let index = 0;

        if (images.length > 0) {
            images[index].classList.add("active");

            let autoChange = setInterval(() => {
                changeImage(1);
            }, 3000);

            function changeImage(direction) {
                images[index].classList.remove("active");
                index = (index + direction + images.length) % images.length;
                images[index].classList.add("active");
            }

            if (prevButton) {
                prevButton.addEventListener("click", () => {
                    clearInterval(autoChange); 
                    changeImage(-1);
                });
            }

            if (nextButton) {
                nextButton.addEventListener("click", () => {
                    clearInterval(autoChange); 
                    changeImage(1);
                });
            }
        }
    });

    const textarea = document.getElementById("mensaje");
    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        });
    }

    const form = document.getElementById("form-experiencia");
    const listaExperiencias = document.getElementById("lista-experiencias");
    const contadorExperiencias = document.getElementById("contador-experiencias");
    let contador = 2; // Se inicia en 2 porque ya hay dos experiencias fijas

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
