// Validar el buscador
$("#formulario").submit(function (event) {
    event.preventDefault();
    let searchHeroe = $("#superhero").val().trim();
    let validar = /^[1-9][0-9]{0,2}$|^900$/;
    if (!searchHeroe.match(validar)) {
        $(".errorTexto")
            .html("El número debe ser un número entre 1 y 900.")
            .css("color", "red");
        $(".resultado").html("");
        return;
    } else {
        $(".errorTexto").html("");
    }
    $(".resultado").html("Este es tu Súper Héroe:").css("color", "green");
    buscarHeroePorId(searchHeroe);
});

// Usar API para buscar información de un héroe por ID
function buscarHeroePorId(id) {
    $.ajax({
        method: "GET",
        url: `https://www.superheroapi.com/api/access-token/${id}`,
        dataType: "json",
        success: function (response) {
            if (response.response === "error") {
                $(".resultado").html("No se encontró ningún superhéroe con ese ID").css("color", "red");
                return;
            }
            renderizarTarjeta(response);
        },
        error: function (xhr, status, error) {
            console.error(error);
        },
    });
}

// Función para renderizar la tarjeta del superhéroe
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
            intelligence: response.powerstats.intelligence,
            strength: response.powerstats.strength,
            speed: response.powerstats.speed,
            durability: response.powerstats.durability,
            power: response.powerstats.power,
            combat: response.powerstats.combat,
        },
    };

    // Tarjeta del superhéroe
    let tarjetaHTML = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${superhero.imagen}" class="card-img-top" alt="${superhero.nombre}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Heroe: ${superhero.nombre}</h5>
                        <p class="card-text"><b>Conexiones:</b> ${superhero.conexiones}</p>
                        <p class="card-text"><b>Publicado:</b> ${superhero.publisher}</p>
                        <p class="card-text"><b>Alineación:</b> ${superhero.alineacion}</p>
                        <p class="card-text"><b>Peso:</b> ${superhero.peso}</p>
                        <p class="card-text"><b>Altura:</b> ${superhero.altura}</p>
                        <p class="card-text"><b>Primera aparición:</b> ${superhero.apariciones}</p>
                        <p class="card-text"><b>Ocupación: </b>${superhero.ocupacion}</p>
                        <p class="card-text"><b>Super poderes:</b></p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Durabilidady:</b> ${superhero.powerstats.durability} </li>
                            <li class="list-group-item"><b>Rapidez: </b>${superhero.powerstats.speed}</li>
                            <li class="list-group-item"><b>Fuerza:</b> ${superhero.powerstats.strength}</li>
                            <li class="list-group-item"><b>Poder: </b>${superhero.powerstats.power}</li>
                            <li class="list-group-item"><b>Inteligencia:</b> ${superhero.powerstats.intelligence}</li>
                            <li class="list-group-item"><b>Combate:</b> ${superhero.powerstats.combat}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    $("#cardsSuperHero").html(tarjetaHTML);
}

