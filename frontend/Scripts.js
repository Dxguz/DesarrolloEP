// Scripts.js
import {
    auth,
    provider,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail
  } from './firebase.js';
  
  // Botones cambio de vista
  document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
  document.getElementById("btn__registrarse").addEventListener("click", register);
  window.addEventListener("resize", anchoPage);
  
  // Referencias de formularios
  const formulario_login = document.querySelector(".formulario__login");
  const formulario_register = document.querySelector(".formulario__register");
  const contenedor_login_register = document.querySelector(".contenedor__login-register");
  const caja_trasera_login = document.querySelector(".caja__trasera-login");
  const caja_trasera_register = document.querySelector(".caja__trasera-register");
  
  // Ajuste de interfaz según ancho
  function anchoPage() {
      if (window.innerWidth > 850) {
          caja_trasera_register.style.display = "block";
          caja_trasera_login.style.display = "block";
      } else {
          caja_trasera_register.style.display = "block";
          caja_trasera_register.style.opacity = "1";
          caja_trasera_login.style.display = "none";
          formulario_login.style.display = "block";
          contenedor_login_register.style.left = "0px";
          formulario_register.style.display = "none";
      }
  }
  anchoPage();
  
  // Vista login
  function iniciarSesion() {
      formulario_login.style.display = "block";
      formulario_register.style.display = "none";
      contenedor_login_register.style.left = window.innerWidth > 850 ? "10px" : "0px";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.opacity = "0";
  }
  
  // Vista registro
  function register() {
      formulario_register.style.display = "block";
      formulario_login.style.display = "none";
      contenedor_login_register.style.left = window.innerWidth > 850 ? "410px" : "0px";
      caja_trasera_register.style.opacity = "0";
      caja_trasera_login.style.opacity = "1";
  }
  
  // LOGIN email/contraseña
  formulario_login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = formulario_login.querySelector('input[type="email"]');
    const passwordInput = formulario_login.querySelector('input[type="password"]');
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!userCredential.user.emailVerified) {
        alert("Debes verificar tu correo antes de iniciar sesión.");
        await signOut(auth);
        return;
    }

    alert("Inicio de sesión exitoso");

    // Limpiar campos del formulario de inicio de sesión
    emailInput.value = "";
    passwordInput.value = "";

    // Redirigir al chatbot
    window.location.href = "Chatbot.html";
} catch (error) {
    alert("Error al iniciar sesión: " + error.message);
}

});

  
  // REGISTRO email/contraseña + verificación

  formulario_register.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = formulario_register.querySelector('input[type="email"]');
    const passwordInput = formulario_register.querySelector('input[type="password"]');
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("Registro exitoso. Revisa tu correo para verificar tu cuenta.");

        // Limpiar campos del formulario de registro
        emailInput.value = "";
        passwordInput.value = "";
    } catch (error) {
        alert("Error al registrar: " + error.message);
    }
});

  
  // LOGIN con Google
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  googleLoginBtn.addEventListener('click', async () => {
      try {
          const result = await signInWithPopup(auth, provider);
          alert("Inicio de sesión con Google exitoso: " + result.user.email);

          window.location.href = "Chatbot.html";

      } catch (error) {
          alert("Error con Google Sign-In: " + error.message);
      }
  });
  
  // Recuperar contraseña
  const recuperarBtn = document.getElementById('recuperarPasswordBtn');
  recuperarBtn.addEventListener('click', async () => {
      const email = prompt("Ingresa tu correo electrónico para recuperar tu contraseña:");
      if (!email) return;
  
      try {
          await sendPasswordResetEmail(auth, email);
          alert("Correo enviado. Revisa tu bandeja de entrada.");
      } catch (error) {
          alert("Error al enviar recuperación: " + error.message);
      }
  });