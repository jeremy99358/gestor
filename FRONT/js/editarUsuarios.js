async function getUsuarios() {
    const res = await fetch('http://localhost:4000/usuarios');
    const resJson = await res.json();
    return resJson;
}

async function prueba() {
    try {
        const datos = await getUsuarios();
        let cadena = '<tr> <th>CEDULA</th> <th>NOMBRE</th> <th>CONTRASEÑA</th> <th> CORREO </th><th> TIPO USUARIO</th><th>EDITAR</th><th>ELIMINAR</th>  </tr>';

        for (let todos of datos) {
            cadena += `<tr>
                    <td> ${todos.usuario}</td>
                    <td> ${todos.nombre}</td>
                    <td> ${todos.contra}</td>
                    <td> ${todos.correo}</td>
                    <td> ${todos.op_usuario}</td>
            <td><button onclick="editarUsuario(${todos.usuario}, '${todos.nombre}', '${todos.contra}','${todos.correo}')"> <i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button id="deleteU" onclick="deleteU(${todos.usuario})"><i class="fa-solid fa-delete-left"></i></button></td>
        </tr>`;
        }

        document.getElementById("tabla").innerHTML = cadena;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

async function deleteU(usuario) {
    if (confirm('¿Está seguro de eliminar este usuarios?')) {
        try {
            const res = await fetch(`http://localhost:4000/usuarios/${usuario}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.error('Error al eliminar el usuario:', e);
        }

    }
    prueba();
}
function editarUsuario(usuario, nombre, contra,correo) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('contra').value = contra;
    document.getElementById('correo').value = correo;
    document.getElementById('editForm').style.display = 'block';

    document.getElementById('btn_guardar').onclick = function () {
        guardarCambios(usuario);
    };
}

async function guardarCambios(usuario) {
    const nombre = document.getElementById('nombre').value;
    const contra = document.getElementById('contra').value;
    const correo = document.getElementById('correo').value;

    const data = {
        nombre: nombre,
        contra: contra,
        correo:correo
    };

    try {
        const res = await fetch(`http://localhost:4000/usuarios/${usuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('Modificación exitosa');
            document.getElementById('editForm').style.display = 'none';
            prueba(); // Actualizar la lista de productos
        } else {
            alert('Error al modificar');
        }
    } catch (error) {
        console.error('Error al modificar los datos:', error);
        alert('Error al modificar: ' + error.message);
    }
}


// Ejecutar la función prueba cuando la página se cargue
window.onload = prueba;
