async function registrar() {
  let cedula = document.getElementById("txt_ID").value;
  let nombre = document.getElementById("txt_prov1").value;
  let tipo_ced = document.getElementById("select_ced").value;
  let tipo_cliente = document.getElementById("select_cliente").value;

  // Verificar que los valores se obtienen correctamente
  console.log('Cedula:', cedula);
  console.log('Nombre:', nombre);
  console.log('Tipo de Cedula:', tipo_ced);
  console.log('Tipo de Cliente:', tipo_cliente);

  const data = {
    id: cedula,
    nombre: nombre,
    tipo_ced: document.querySelector(`#select_ced option[value="${tipo_ced}"]`).innerHTML,
    tipo_cliente: document.querySelector(`#select_cliente option[value="${tipo_cliente}"]`).innerHTML
  };

  // Verificar que los datos se formatean correctamente
  console.log('Datos a enviar:', data);

  try {
    const res = await fetch('http://localhost:4000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await res.json(); // Obtener la respuesta del servidor

    if (res.ok) {
      alert('Registro exitoso');
      window.location.href = './mostrarClientes.html';
    } else {
      alert('Error al registrar: ' + responseData.message);
      console.log('Error al registrar:', responseData);
    }
  } catch (error) {
    console.error('Error al registrar los datos:', error);
    alert('Error al registrar: ' + error.message);
  }
}

document.getElementById('btn_aceptar').addEventListener('click', function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  registrar();
});
