async function getFactura() {
    const res = await fetch('http://localhost:4000/ingresos');
    const resJson = await res.json();
    return resJson;
}
async function enviarFactura() {
    const fecha = document.getElementById('fecha').value;
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const tipo_moneda = document.getElementById('tipo_moneda').value;
    const tipo_iva = parseFloat(document.getElementById('tipo_iva').value);

    // Calcular IVA y subtotal
    const iva = monto * tipo_iva;
    const subtotal = monto + iva;

    const data = {
        fecha,
        id,
        nombre,
        monto,
        tipo_moneda,
        tipo_iva,
        iva,
        subtotal
    };

    console.log('Datos a enviar:', data); // Log para verificar los datos

    try {
        const response = await fetch('http://localhost:4000/ingresos', { // Asegúrate de que la URL sea correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log('Respuesta del servidor:', response); // Log para verificar la respuesta

        if (response.ok) {
            const result = await response.json();
            console.log('Resultado del servidor:', result); // Log para verificar el resultado
            alert(result.message);
        } else {
            const error = await response.json();
            console.log('Error del servidor:', error); // Log para verificar el error
            alert(error.message);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al enviar los datos');
    }
}

document.getElementById('btn_aceptar').addEventListener('click', enviarFactura);
