// se crea la simulacion del servidor 
const express = require('express');

// dependecias
const morgan = require('morgan');
const database = require("./database");
const cors = require('cors'); 

// inicializamos el server
const app = express();
app.set("port",4000);
app.listen(app.get('port'));
console.log("el servidor esta en linea en el puerto "+app.get('port'));

// middleware
// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5000","http://127.0.0.1:5500"]
    // si quiero poner todoas las direcciones de url se cambia 'cors' a '*'
}));
app.use(express.json());



// rutas

// Ruta para obtener todos los usuarios registrados en la base de datos.
app.get("/usuarios", async (req, res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM registro");
    res.json(result);
});
app.post("/usuarios", async (req, res) => {
    const connection = await database.getConnection();
    const { usuario, nombre, contra, correo, op_usuario } = req.body;

    // Verifica que los datos necesarios estén presentes
    if (!usuario|| !nombre || !contra || !correo || !op_usuario) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    await connection.query("INSERT INTO registro (usuario, nombre, contra, correo, op_usuario) VALUES (?, ?, ?, ?, ?)", [usuario, nombre, contra, correo, op_usuario]);
    res.status(201).json({ message: "Usuario agregado correctamente" });
});
app.put("/usuarios/:usuario", async (req, res) => {
    const connection = await database.getConnection();
    const { usuario } = req.params;
    const { nombre, contra, correo } = req.body;

    // Verifica que los datos necesarios estén presentes
    if (!usuario|| !nombre || !contra || !correo ) {
        return res.status(400).json({ message: "Faltan datos para actualizar" });
    }

    const updates = [];
    const values = [];

    if (nombre) {
        updates.push("nombre = ?");
        values.push(nombre);
    }

    if (contra) {
        updates.push("contra = ?");
        values.push(contra);
    }
    
    if (correo) {
        updates.push("correo = ?");
        values.push(correo);
    }
    
    

    values.push(usuario); // Agrega el idproducto al final para la consulta

    await connection.query(`UPDATE registro SET ${updates.join(", ")} WHERE usuario = ?`, values);
    res.status(200).json({ message: "Usuario actualizado correctamente" });
});
app.delete("/usuarios/:usuario", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const { usuario } = req.params;

        console.log(`Intentando eliminar el usuario con id: ${usuario}`);

        // Verifica que el usuario esté presente
        if (!usuario) {
            console.log("Falta el id del producto");
            return res.status(400).json({ message: "Falta el id del usuario" });
        }

        const result = await connection.query("DELETE FROM registro WHERE usuario = ?", [usuario]);
        console.log(`Resultado de la eliminación: ${result}`);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
});

// rutas para obtener los clientes registrados
app.get("/clientes", async (req, res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM registro_clientes");
    res.json(result);
});
app.post("/clientes", async (req, res) => {
    const connection = await database.getConnection();
    const { id, nombre, tipo_ced, tipo_cliente } = req.body;

    // Verifica que los datos necesarios estén presentes
    if (!id|| !nombre || !tipo_ced || !tipo_cliente ) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    await connection.query("INSERT INTO registro_clientes (id, nombre, tipo_ced, tipo_cliente) VALUES (?, ?, ?, ?)", [id, nombre, tipo_ced, tipo_cliente]);
    res.status(201).json({ message: "Usuario agregado correctamente" });
});

// rutas para obtenr los ingresos
app.get("/ingresos", async (req, res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM ingresos");
    res.json(result);
});

// Ruta para agregar un nuevo ingreso

app.post('/ingresos', async (req, res) => {
    console.log('Solicitud recibida:', req.body); // Log para verificar la solicitud

    const connection = await database.getConnection();
    const { fecha, id, nombre, monto, tipo_moneda, tipo_iva, iva, subtotal } = req.body;

    // Verifica que los datos necesarios estén presentes
    if (!fecha || !id || !nombre || !monto || !tipo_moneda || !tipo_iva || !iva || !subtotal) {
        console.log('Faltan datos requeridos'); // Log para verificar datos faltantes
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        await connection.query('INSERT INTO ingresos (fecha, id, nombre, monto, tipo_moneda, tipo_iva, iva, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [fecha, id, nombre, monto, tipo_moneda, tipo_iva, iva, subtotal]);

        console.log('Ingreso agregado correctamente'); // Log para verificar el éxito
        res.status(201).json({ message: 'Ingreso agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar el ingreso:', error); // Log para verificar el error
        res.status(500).json({ message: 'Error al agregar el ingreso' });
    }
});


















