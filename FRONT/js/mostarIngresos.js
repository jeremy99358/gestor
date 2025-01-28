async function getUsuarios() {
    const res = await fetch('http://localhost:4000/ingresos');
    const resJson = await res.json();
    return resJson;
  }
  
  async function mostrar() {
    try {
      const datos = await getUsuarios();
      let cadena = '<tr> <th>ID INGRESO</th> <th>FECHA</th> <th>ID USUARIO</th> <th>NOMBRE USUARIO</th>'+
        ' <th>MONTO</th> <th>TIPO DE MONEDA</th> <th>TIPO DE IVA</th> <th>IVA</th> <th>SUBTOTAL</th> </tr>';
  
      for (let todos of datos) {
        cadena += `<tr>
                <td> ${todos.id_ingreso}</td>
                <td> ${todos.fecha}</td>
                <td> ${todos.id}</td>
                <td> ${todos.nombre}</td>
                <td> ${todos.monto}</td>
                <td> ${todos.tipo_moneda}</td>
                <td> ${todos.tipo_iva}</td>
                <td> ${todos.iva}</td>
                <td> ${todos.subtotal}</td>
                
               
              </tr>`;
      }
      document.getElementById("tabla").innerHTML = cadena;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  
  
  // Ejecutar la función prueba cuando la página se cargue
  window.onload = mostrar;