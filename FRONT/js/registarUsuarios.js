
async function registrar() {
  let usuario = document.getElementById("txt_usuario_reg").value;
  let correo = document.getElementById("txt_email").value;
  let contra = document.getElementById("txt_pass_reg").value;
  let nombre = document.getElementById("txt_nombre").value;
  let select = document.getElementById("select_TU");
  var op_usuario = document.getElementsByTagName("option"); 

  const data = {
    usuario: usuario,
    nombre: nombre,
    contra: contra,
    correo:correo,
    op_usuario :op_usuario[select.value-1].innerHTML
  };

  try {
      const res = await fetch('http://localhost:4000/usuarios', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (res.ok) {
          alert('Registro exitoso');
          //prueba(); // Actualizar la lista de productos
          window.location.href= './usuarios.html'; 
      } else {
          alert('Error al registrar');
      }
  } catch (error) {
      console.error('Error al registrar los datos:', error);
      alert('Error al registrar' + error.message);
  }
}
var btn_registrar = document.getElementById('btn_registro');
btn_registrar.addEventListener('click', registrar);