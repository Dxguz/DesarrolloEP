const form = document.getElementById("initial-form");
const chatInputArea = document.getElementById("chat-input-area");
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const imageInput = document.getElementById("chat-image");
const messages = document.getElementById("messages");

function addMessage(text, sender = "bot", imageSrc = null) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
  msg.innerText = text;

  if (imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    msg.appendChild(document.createElement("br"));
    msg.appendChild(img);
  }

  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Manejo del formulario inicial
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const cultivo = document.getElementById("cultivo").value;
  const problema = document.getElementById("problema").value;
  const imagenInput = document.getElementById("imagen");
  const imagenFile = imagenInput.files[0];

  addMessage(
    `👤 ${nombre} ${apellido}\n📍 ${ubicacion}\n🌾 Cultivo: ${cultivo}\n📝 Problema: ${problema}`,
    "user"
  );

  if (imagenFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      addMessage("📷 Imagen enviada:", "user", e.target.result);
    };
    reader.readAsDataURL(imagenFile);
  }

  setTimeout(() => {
    addMessage("Estoy evaluando la situación para darte la mejor solución...", "bot");
  }, 1000);

  form.style.display = "none";
  chatInputArea.style.display = "flex";
});

// Enviar mensajes y/o imágenes en el chat normal
function sendChatMessage() {
  const text = messageInput.value.trim();
  const imageFile = imageInput.files[0];

  if (text || imageFile) {
    if (text) {
      addMessage(text, "user");
    }

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        addMessage("📷 Imagen enviada:", "user", e.target.result);
      };
      reader.readAsDataURL(imageFile);
    }

    messageInput.value = "";
    imageInput.value = "";

    setTimeout(() => {
      addMessage("Gracias por tu mensaje. Te responderemos pronto.", "bot");
    }, 1000);
  }
}

// Enviar al presionar botón
sendBtn.addEventListener("click", sendChatMessage);

// Enviar al presionar Enter
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendChatMessage();
  }
});
