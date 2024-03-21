//Validar el Buscador:

$("#formulario").submit(function (event) {
    event.preventDefault();
    let searchHeroe = $("#searchHeroe").val().trim();
    let validar = /^[1-9][0-9]{0,2}$|^[1-6][0-9]{2}$|^7[0-2][0-9]$|^73[0-2]$/; // Números del 1 al 732
    if (!searchHeroe.match(validar)) {
    $(".errorTexto")
        .html("El número debe ser un número entre 1 y 732.")
        .css("color", "red");
    $(".resultado").html("");
    return;
    } else {
    $(".errorTexto").html("");
    }
    $(".resultado").html("Buscando tu Súper Héroe...").css("color", "green");
    buscarHeroe(searchHeroe);
});

  //Usar Api para traer información 
function buscarHeroe(id) {
    $.ajax({
        method: "GET",
        url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
        dataType: "json",
        success: function (response) {
        if (response.response === "error") {
            return;
        }
        renderizarTarjeta(response);
        },
        error: function (xhr, status, error) {},
    });
    }
    //Función Datos de Superhéroe
    function renderizarTarjeta(response) {
    let superhero = {
        nombre: response.name,
        imagen: response.image.url,
        apariciones: response.biography["first-appearance"],
        alineacion: response.biography.alignment,
        peso: response.appearance.weight,
        altura: response.appearance.height,
        ocupacion: response.work.occupation,
        publisher: response.biography.publisher,
        conexiones: response.connections["group-affiliation"],
        relatives: response.connections.relatives,
        powerstats: {
        intelligence: parseInt(response.powerstats.intelligence) || "No disponible",
        strength: parseInt(response.powerstats.strength) || "No disponible",
        speed: parseInt(response.powerstats.speed) || "No disponible",
        durability: parseInt(response.powerstats.durability) || "No disponible",
        power: parseInt(response.powerstats.power) || "No disponible",
        combat: parseInt(response.powerstats.combat) || "No disponible",
    },
    };

    
   //Tarjeta de Superhéroe
    let tarjetaHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
    <div class="col-md-4">
                    <img src="${superhero.imagen}" class="card-img-top" alt="${superhero.nombre}">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Súper Héroe: ${superhero.nombre}</h5>
                        <p class="card-text"><b>Conexiones:</b> ${superhero.conexiones}</p>
                        <p class="card-text"><b>Publicado por:</b> ${superhero.publisher}</p>
                        <p class="card-text"><b>Alineación:</b> ${superhero.alineacion}</p>
                        <p class="card-text"><b>Peso:</b> ${superhero.peso}</p>
                        <p class="card-text"><b>Altura:</b> ${superhero.altura}</p>
                        <p class="card-text"><b>Primera aparición:</b> ${superhero.apariciones}</p>
                        <p class="card-text"><b>Ocupación:</b> ${superhero.ocupacion}</p>
                        <p class="card-text"><b>Estadísticas de Poder:</b></p>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Durabilidad:</b> ${superhero.powerstats.durability} </li>
                        <li class="list-group-item"><b>Rapidez:</b> ${superhero.powerstats.speed}</li>
                        <li class="list-group-item"><b>Fuerza:</b> ${superhero.powerstats.strength}</li>
                        <li class="list-group-item"><b>Poder:</b> ${superhero.powerstats.power}</li>
                            <li class="list-group-item"><b>Inteligencia:</b> ${superhero.powerstats.intelligence}</li>
                            <li class="list-group-item"><b>Combate:</b> ${superhero.powerstats.combat}</li>
                        </ul>
                    </div>
                    </div>
                </div>
            `;
    
    $("#resultado").html(tarjetaHTML);

    //Grafico de Superhéroe
    let chart = new CanvasJS.Chart("graficoHeroe", {
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
        text: "Estadísticas de Poder para " + superhero.nombre,
        },
        data: [
        {
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
            { y: parseInt(superhero.powerstats.intelligence) || 0, label: "Inteligencia" },
            { y: parseInt(superhero.powerstats.strength) || 0, label: "Fuerza" },
            { y: parseInt(superhero.powerstats.speed) || 0, label: "Rapidez" },
            { y: parseInt(superhero.powerstats.durability) || 0, label: "Durabilidad" },
            { y: parseInt(superhero.powerstats.power) || 0, label: "Poder" },
            { y: parseInt(superhero.powerstats.combat) || 0, label: "Combate" },
        ],
        },
        ],
    });
    chart.render();
    }


