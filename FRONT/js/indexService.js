
//cod para comunicar con el back

async function getUusuario() {
    const res = await fetch('http://localhost:4000/usuarios');
    const resJson = await res.json();
    return resJson;

}


async function ingresar() {
    let usuario = document.getElementById("txt_usuario").value;
    let pass = document.getElementById("txt_pass").value;
    try {
        const datos = await getUusuario();


        for (let todos of datos) {

            if (todos.usuario == usuario && todos.contra == pass) {

                alert("Ingreso exitoso " + todos.usuario);
                window.location.href = './usuarios.html';
                break;
            } else {

                alert("Usuario o contraseña incorrecta");

                break;

            }

        }

    } catch (error) {
        console.error('Error al obtener los datos : ', error);
    }

}

// Función para mostrar los datos en el HTML

var btn_iniciar = document.getElementById('btn_iniciar');
btn_iniciar.addEventListener('click', ingresar);

