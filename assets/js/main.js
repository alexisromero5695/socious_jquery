
var peliculas = [];
function filtrarPorGenero(genero) {
    let html = ``;
    $(".movieSection").addClass("d-none");
    if (genero != "*") {
        let peliculasFiltro = peliculas.filter(pelicula => pelicula.genre == genero);
        html = `<div class="p-5">
                    <h2>${genero} (${peliculasFiltro.length})</h2>
                    <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-4">`;
        $.each(peliculasFiltro, function (i, pelicula) {
            html += `<div class="col ">
                                        <div class="row card-movies g-0">
                                            <div class="col-sm-5">
                                                <img src="https://static.vecteezy.com/system/resources/previews/014/384/861/large_2x/cute-popcorn-holding-soda-and-straw-with-3d-movie-glasses-cartoon-icon-illustration-movie-food-cartoon-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg" class="card-img-top h-100" alt="...">
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="card-body">
                                                    <h5 class="card-title">${pelicula.title}</h5>
                                                    <small>${pelicula.year}</small>
                                                    <p class="card-text">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo? Minima,
                                                        molestias! Sequi rem
                                                        nihil commodi similique ipsum beatae cumque, nostrum suscipit dolor? Amet debitis reiciendis, nam
                                                        eos nobis odit.
                                                    </p>
                                                    <button class="btn btn-primary">Ver ahora <i class="fas fa-play"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                </div>`;
        });
        html += `</div>
                </div>`;
        $("#movieList").removeClass("d-none");
        $("#movieList").html(html);
    } else {
        $("#movieSearch").removeClass("d-none");
    }
}

function getPelicula(element) {
    let id = $(element).val();
    if (id != "") {
        $("#movieDetail").removeClass("d-none");
        let year = $(element).find('option:selected').data('year');
        let genre = $(element).find('option:selected').data('genre');
        let title = $(element).find('option:selected').text();
        let html = `<div class="d-flex col-md-6 text-white align-items-start flex-column justify-content-center">
                        <h2 class="fw-bolder" id="title">${title}</h2>
                        <div class="d-flex gap-3">
                            <h4 id="year">${year}</h4>
                            <h4>|</h4>
                            <h4 id="genre">${genre}</h4>
                        </div>
                        <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo? Minima,
                            molestias! Sequi rem
                            nihil commodi similique ipsum beatae cumque, nostrum suscipit dolor? Amet debitis reiciendis, nam
                            eos nobis odit.
                        </p>
                        <button class="btn btn-primary mb-2">Ver ahora <i class="fas fa-play"></i></button>
                    </div>
                    <div class="col-md-6">
                        <img class="img-fluid" src="https://www.foghornnews.com/wp-content/uploads/2015/12/watch-movie.jpg" alt="${title}" title="${title}" srcset="">
                    </div>`;
        $("#movieDetail").html(html);
    } else {
        $("#movieDetail").addClass("d-none");
    }
}

$(document).ready(function () {
    $('#listaPeliculas').select2({ theme: 'bootstrap-5' });
    $.ajax({
        type: 'GET',
        url: "https://www.codigo-alfa.cl/aglo/Tester/listasPeliculas",
        async: false,
        success: function (data) {
            peliculas = data.peliculas;
            const generos = [...new Set(peliculas.map(pelicula => pelicula.genre))];

            let htmlGeneros = ``;
            $.each(generos, function (i, genero) {
                htmlGeneros += `<li><a class="dropdown-item" onclick="filtrarPorGenero('${genero}')" href="#">${genero}</a></li>`;
            })
            $("#dropdownGenre").html(htmlGeneros);

            let htmlPeliculas = `<option value="">Selecciona una película</option>`;
            $.each(peliculas, function (i, pelicula) {
                htmlPeliculas += `<option data-year="${pelicula.year}" data-genre="${pelicula.genre}" value="${pelicula.id}">${pelicula.title}</option>`;
            })
            $("#listaPeliculas").html(htmlPeliculas);
        }
    })
})