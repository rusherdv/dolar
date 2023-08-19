dark = 0
let dataObject;
let darkmode = false

async function fetchData() {
    var element = document.querySelector('.spinner-border')
    element.style.display = 'block'
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares");
        dataObject = await response.json();
        mostrarData();
        console.log(dataObject)
        element.style.display = 'none';
        return dataObject;
    } catch (error) {
        console.log(error);
        element.style.display = 'none';
        return null;
    }
}

const loadChart = () => {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: darkmode ? 'dark2' : 'light2',

        axisY: {
            title: "Precio en Pesos",
            suffix: "$"
        },
        axisX: {
            title: ""
        },
        data: [{
            type: "column",
            yValueFormatString: "$\#,##0.0#",
            dataPoints: [
                { label: "2010", y: 4 },	
                { label: "2011", y: 4.50 },	
                { label: "2012", y: 5 },
                { label: "2013", y: 6 },	
                { label: "2014", y: 8 },
                { label: "2015", y: 13 },
                { label: "2016", y: 16 },
                { label: "2017", y: 18 },
                { label: "2018", y: 38 },
                { label: "2019", y: 63 },
                { label: "2020", y: 89 },
                { label: "2021", y: 108 },
                { label: "2022", y: 337 },
                { label: "2023", y: dataObject[1].venta },
                
            ]
        }]
    });
    chart.render();
}

const actualizar = () => {
    fetchData()
    document.querySelector('#data').innerHTML = ``
}

const mostrarData = () => {
    dataObject.forEach(element => {

        if (element.compra === null){
            const tdType = document.createElement('td')
            const tdBuy = document.createElement('td')
            const tdSell = document.createElement('td')
            const tr = document.createElement('tr')

            tdType.innerHTML = `<strong>${element.nombre}</strong>`
            tdBuy.innerHTML = `<strong>-</strong>`
            tdSell.innerHTML = `<strong>$${element.venta}</strong>`
        
            tdBuy.classList.add('text')
            tdType.classList.add('text')
            tdSell.classList.add('text')

            tr.appendChild(tdType)
            tr.appendChild(tdBuy)
            tr.appendChild(tdSell)
            document.querySelector('#data').appendChild(tr)
        }else{
            const tdType = document.createElement('td')
            const tdBuy = document.createElement('td')
            const tdSell = document.createElement('td')
            const tr = document.createElement('tr')
    
            tdType.innerHTML = `<strong>${element.nombre}</strong>`
            tdBuy.innerHTML = `<strong>$${element.compra}</strong>`
            tdSell.innerHTML = `<strong>$${element.venta}</strong>`
        
            tdBuy.classList.add('text')
            tdType.classList.add('text')
            tdSell.classList.add('text')

            tr.appendChild(tdType)
            tr.appendChild(tdBuy)
            tr.appendChild(tdSell)
            document.querySelector('#data').appendChild(tr)
        }
    });

    const timestamp = new Date(dataObject[0].fechaActualizacion.replace(' ', 'T'));
    const day = timestamp.getDate().toString().padStart(2, '0');
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 ya que los meses empiezan desde 0
    const year = timestamp.getFullYear();
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');

    actu = `<h2 style="text-align: center; font-size: 15px">La ultima actualizacion fue el dia: <strong> ${day}/${month}/${year}</strong> a la hora: <strong>${hours}:${minutes}</strong></h2>`
    document.getElementById('actu').innerHTML = actu
}

document.addEventListener('DOMContentLoaded', async ()  => {

    try {
        const response = await fetch("https://dolarapi.com/v1/dolares");
        dataObject = await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }

    mostrarData()
    loadChart()
})

document.querySelector('#checkbox').addEventListener('change', () => {

    if(!darkmode){
        document.documentElement.style.setProperty('--color-blanco', 'black');
        document.documentElement.style.setProperty('--color-negro', 'white');
        document.documentElement.style.setProperty('--color-verde', 'gray');
        document.documentElement.style.setProperty('--color-verdeoscuro', 'rgb(82, 82, 82)');
        document.documentElement.style.setProperty('--bg-color', '#32373A');
        document.getElementById("banner").setAttribute("style", "filter:brightness(50%)")
        darkmode = true
        loadChart()
    }else if (darkmode){
        document.documentElement.style.setProperty('--color-blanco', 'white');
        document.documentElement.style.setProperty('--color-negro', 'black');
        document.documentElement.style.setProperty('--color-verde', 'rgb(0, 192, 0)');
        document.documentElement.style.setProperty('--color-verdeoscuro', 'rgb(83, 138, 0)');
        document.documentElement.style.setProperty('--bg-color', 'white');
        document.getElementById("banner").setAttribute("style", "filter:brightness(100%)")
        darkmode = false
        loadChart()
    }

})
