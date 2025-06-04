// frontend/formHandler.js

import {
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase.js';

// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("initial-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const ubicacion = document.getElementById("ubicacion").value;
    const cultivo = document.getElementById("cultivo").value;
    const problema = document.getElementById("problema").value.trim();
    const imagenInput = document.getElementById("imagen");
    const imagenFile = imagenInput.files[0];

    try {
      let imageUrl = null;

      // Si hay imagen, subirla a Firebase Storage
      if (imagenFile) {
        const storageRef = ref(storage, `problemas/${Date.now()}_${imagenFile.name}`);
        const snapshot = await uploadBytes(storageRef, imagenFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Guardar datos en Firestore
      await addDoc(collection(db, "reportesChatbot"), {
        nombre,
        apellido,
        ubicacion,
        cultivo,
        problema,
        imagenUrl: imageUrl,
        fecha: new Date().toISOString()
      });

      alert("✅ Información enviada correctamente.");
      form.reset();

    } catch (error) {
      console.error("❌ Error al enviar el formulario:", error);
      alert("Hubo un error al guardar los datos. Intenta nuevamente.");
    }
  });
});



