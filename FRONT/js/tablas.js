window.onload = mostrar;

let miCanvas = document.getElementById("MiGrafica").getContext("2d");
let miCanvas2 = document.getElementById("MiGrafica2").getContext("2d");
let chartConfig = {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Gastos de Clientes",
            data: [],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};

let chartConfig2= {
    type: "bar",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "September"],
        datasets: [{
            label: "Ingresos",
            data: [153234, 223243, 2423440, 100000, 2003420, 6032300,243342,342349],
            backgroundColor: [
                "rgba(255, 7, 60, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "black"
            ],
            borderColor: [
                "rgb(55, 255, 5)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "#66FF99"
            ],
            borderWidth: 7
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};

let chart2 = new Chart(miCanvas2, chartConfig2);

let chart = new Chart(miCanvas, chartConfig);

function cambiarTipo(tipo) {
    chart.destroy();
    chartConfig.type = tipo;
    chart = new Chart(miCanvas, chartConfig);
    
    chart2.destroy();
    chartConfig2.type = tipo;
    chart2 = new Chart(miCanvas2, chartConfig2);
    
}
function cambiarTipo2(tipo) {
    
    chart2.destroy();
    chartConfig2.type = tipo;
    chart2 = new Chart(miCanvas2, chartConfig2);

    
}

function descargarGrafica() {
    let link = document.createElement('a');
    link.href = document.getElementById('MiGrafica').toDataURL('image/png');
    
    link.download = 'grafica.png';
    link.click();
}
function descargarGrafica1() {
    let link = document.createElement('a');
    link.href = document.getElementById('MiGrafica2').toDataURL('image/png');
    link.download = 'grafica.png';
    link.click();
}
async function getValores() {
    const res = await fetch('http://localhost:4000/ingresos');
    const resJson = await res.json();
    return resJson;
}

async function mostrar() {
    try {
        const datos = await getValores();
        let cadena = '';
        let nombres = [];
        let montos = [];

        for (let todos of datos) {
            nombres.push(todos.nombre);
            montos.push(todos.monto);
            cadena += `<tr>
                <td>${todos.id_ingreso}</td>
                <td>${todos.fecha}</td>
                <td>${todos.id}</td>
                <td>${todos.nombre}</td>
                <td>${todos.monto}</td>
                <td>${todos.tipo_moneda}</td>
                <td>${todos.tipo_iva}</td>
                <td>${todos.iva}</td>
                <td>${todos.subtotal}</td>
            </tr>`;
        }

        document.querySelector("#tabla tbody").innerHTML = cadena;

        // Actualizar el gráfico con los nuevos datos
        chartConfig.data.labels = nombres;
        chartConfig.data.datasets[0].data = montos;
        chart.update();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}
