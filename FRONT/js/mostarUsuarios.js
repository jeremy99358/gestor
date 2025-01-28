async function getUsuarios() {
  const res = await fetch('http://localhost:4000/usuarios');
  const resJson = await res.json();
  return resJson;
}

async function mostrar() {
  try {
    const datos = await getUsuarios();
    let cadena = '<tr> <th>CEDULA</th> <th>NOMBRE</th> <th>CONTRASEÑA</th> <th> CORREO </th><th> TIPO USUARIO</th>  </tr>';

    for (let todos of datos) {
      cadena += `<tr>
              <td> ${todos.usuario}</td>
              <td> ${todos.nombre}</td>
              <td> ${todos.contra}</td>
              <td> ${todos.correo}</td>
              <td> ${todos.op_usuario}</td>
             
            </tr>`;
    }
    document.getElementById("tabla").innerHTML = cadena;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}


// Ejecutar la función prueba cuando la página se cargue
window.onload = mostrar;
