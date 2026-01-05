const btnMenu = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const btnSubmit = document.querySelector("#btn-submit");
const formulario = document.querySelector("#formulario");

(function () {
  emailjs.init("t33pLD_Lw0_Iq3qjN");
})();

btnMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

formulario.addEventListener("submit", validarForm);

function validarForm(e) {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const tel = document.querySelector("#tel").value;
  const texto = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

  if (nombre.trim() === "" || tel.trim() === "") {
    mostrarAlerta("Todos los campos son obligatorios", "error");
    return; // Detiene la ejecución aquí
  }

  if (!texto.test(nombre)) {
    mostrarAlerta("Debes poner un nombre valido", "error");
    return;
  }

  if (isNaN(tel)) {
    mostrarAlerta("Debes de poner un numero de telefono valido", "error");
    return;
  }

  if (tel.length !== 10) {
    mostrarAlerta("Debes de poner por lo menos 10 numeros", "error");
    return;
  }

  const sniper = document.querySelector("#sniper");

  sniper.classList.remove("hidden");
  sniper.classList.add("flex");
  btnSubmit.style.cursor = "not-allowed";
  btnSubmit.disabled = true;

  const servicioID = "service_xy8ahc7";
  const templateID = "template_tit9ibe";

  emailjs
    .sendForm(servicioID, templateID, formulario)
    .then(() => {
      setTimeout(() => {
        sniper.classList.remove("flex");
        sniper.classList.add("hidden");
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = "pointer";

        mostrarAlerta("En breve nos comunicaremos con usted", "exito");
        formulario.reset();
      }, 2000);
    })
    .catch((error) => {
      sniper.classList.remove("flex");
      sniper.classList.add("hidden");
      btnSubmit.disabled = false;
      btnSubmit.style.cursor = "pointer";
      mostrarAlerta("Hubo un error al cargar", "error");
    });
}

function mostrarAlerta(mjs, tipo) {
  const eliminarAlerta = document.querySelector(".borrarAlerta");
  eliminarAlerta?.remove();

  const alerta = document.createElement("p");
  alerta.textContent = mjs;
  alerta.classList.add("alerta", "borrarAlerta");

  tipo === "error"
    ? alerta.classList.add("bg-red")
    : alerta.classList.add("bg-green");

  formulario.insertBefore(alerta, formulario.firstChild);

  setTimeout(() => {
    alerta.remove();
  }, 4000);
}
