document.addEventListener("DOMContentLoaded", () => {
  const publicarBtn = document.querySelector(".nueva-publicacion button");
  const comentariosUl = document.querySelector(".comentarios");
  const textarea = document.querySelector(".nueva-publicacion textarea");
  const fileInput = document.querySelector(".nueva-publicacion input[type='file']");

  publicarBtn.addEventListener("click", () => {
    const texto = textarea.value.trim();
    const imagen = fileInput.files[0];

    if (texto === "" && !imagen) {
      alert("Escribe algo o sube una imagen.");
      return;
    }

    const nuevoComentario = document.createElement("li");
    nuevoComentario.classList.add("comentario");

    // Usuario fijo por ahora, puedes reemplazarlo con el nombre real del usuario
    const usuarioDiv = document.createElement("div");
    usuarioDiv.classList.add("usuario");
    usuarioDiv.innerHTML = `<strong>Usuario Anónimo</strong>`;
    nuevoComentario.appendChild(usuarioDiv);

    // Añadimos texto si hay
    if (texto) {
      const p = document.createElement("p");
      p.textContent = texto;
      nuevoComentario.appendChild(p);
    }

    // Añadimos imagen sólo cuando se haya leído el archivo
    if (imagen) {
      const img = document.createElement("img");
      img.classList.add("img-subida");

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
        nuevoComentario.appendChild(img);

        // Tras añadir imagen, se añaden controles e insertamos comentario
        agregarControlesYFormulario(nuevoComentario);
        comentariosUl.prepend(nuevoComentario);
      };
      reader.readAsDataURL(imagen);
    } else {
      // Si no hay imagen, directamente añadimos controles y comentario
      agregarControlesYFormulario(nuevoComentario);
      comentariosUl.prepend(nuevoComentario);
    }

    // Limpiar inputs
    textarea.value = "";
    fileInput.value = "";
  });

  // Función para añadir la sección de interacción y formulario de respuesta
  function agregarControlesYFormulario(comentarioLi) {
    const interaccion = document.createElement("div");
    interaccion.classList.add("interaccion");
    interaccion.innerHTML = `
      <button class="like"><i class="fas fa-thumbs-up"></i> Me gusta</button>
      <button class="comment"><i class="fas fa-comment"></i> Comentar</button>
      <button class="share"><i class="fas fa-share"></i> Compartir</button>
    `;
    comentarioLi.appendChild(interaccion);

    const respuestasUl = document.createElement("ul");
    respuestasUl.classList.add("respuestas");
    comentarioLi.appendChild(respuestasUl);

    const respuestaForm = document.createElement("div");
    respuestaForm.classList.add("respuesta-form");
    respuestaForm.style.display = "none";  // Oculto inicialmente
    respuestaForm.innerHTML = `
      <input type="text" placeholder="Responder a este comentario...">
      <button>Enviar</button>
    `;
    comentarioLi.appendChild(respuestaForm);
  }

  // Delegar eventos en la lista de comentarios
  comentariosUl.addEventListener("click", (e) => {
    const target = e.target;

    // Manejar clic en botón 'Comentar' o 'Responder'
    if (
      (target.classList.contains("comment") || target.classList.contains("responder-btn")) ||
      (target.closest("button") && (target.closest("button").classList.contains("comment") || target.closest("button").classList.contains("responder-btn")))
    ) {
      const comentarioLi = target.closest(".comentario");
      if (!comentarioLi) return;
      const respuestaForm = comentarioLi.querySelector(".respuesta-form");
      if (respuestaForm.style.display === "none") {
        respuestaForm.style.display = "block";
        respuestaForm.querySelector("input").focus();
      } else {
        respuestaForm.style.display = "none";
      }
      return;
    }

    // Manejar clic en botón 'Enviar' dentro de respuesta
    if (target.tagName === "BUTTON" && target.textContent.trim() === "Enviar") {
      const form = target.closest(".respuesta-form");
      const input = form.querySelector("input");
      const respuestaTexto = input.value.trim();

      if (respuestaTexto !== "") {
        const respuestasUl = form.parentElement.querySelector(".respuestas");
        const nuevaRespuesta = document.createElement("li");
        nuevaRespuesta.innerHTML = `<div><strong>Tú:</strong> ${respuestaTexto}</div>`;
        respuestasUl.appendChild(nuevaRespuesta);
        input.value = "";
        form.style.display = "none";
      }
      return;
    }

    // Opcional: manejo básico de Me gusta (toggle)
    if (target.closest("button") && target.closest("button").classList.contains("like")) {
      const btn = target.closest("button");
      btn.classList.toggle("liked");
      btn.innerHTML = btn.classList.contains("liked")
        ? `<i class="fas fa-thumbs-up"></i> Me gusta (✔)`
        : `<i class="fas fa-thumbs-up"></i> Me gusta`;
    }

    // Opcional: manejo básico de Compartir (solo alert para demo)
    if (target.closest("button") && target.closest("button").classList.contains("share")) {
      alert("Función de compartir no implementada.");
    }
  });
});
