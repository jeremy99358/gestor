async function getUsuarios() {
    const res = await fetch('http://localhost:4000/clientes');
    const resJson = await res.json();
    return resJson;
  }
  
  async function mostrar() {
    try {
      const datos = await getUsuarios();
      let cadena = '<tr> <th>CEDULA</th> <th>NOMBRE</th> <th>Tipo cedula    </th> <th> TIPO USUARIO</th>  </tr>';
  
      for (let todos of datos) {
        cadena += `<tr>
                <td> ${todos.id}</td>
                <td> ${todos.nombre}</td>
                <td> ${todos.tipo_ced}</td>
                <td> ${todos.tipo_cliente}</td>
                
               
              </tr>`;
      }
      document.getElementById("tabla").innerHTML = cadena;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  
  
  // Ejecutar la función prueba cuando la página se cargue
  window.onload = mostrar;
  