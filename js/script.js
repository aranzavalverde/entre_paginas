//CALENDARIO//
let mes = 10;
let año = 2026;

const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

//Comprobar si estamos en la página del calendario//
if (document.getElementById("mes-anterior")) {

    function mostrarCalendario() {

        document.getElementById("mes-actual").textContent =
            nombresMeses[mes] + " " + año;

        let dias = document.getElementById("dias-calendario");

        dias.innerHTML = "";

        let primerDia = new Date(año, mes, 1).getDay();
        let cantidadDias = new Date(año, mes + 1, 0).getDate();

        //Comenzar la semana el lunes//
        if (primerDia == 0) {
            primerDia = 7;
        }

        for (let i = 1; i < primerDia; i++) {
            dias.innerHTML += '<div class="dia vacio"></div>';
        }

        for (let i = 1; i <= cantidadDias; i++) {

            if (mes == 10 && (i == 18 || i == 21 || i == 25)) {
                dias.innerHTML += '<div class="dia tiene-actividad" onclick="mostrarActividad(' + i + ')">' + i + '</div>';
            } else {
                dias.innerHTML += '<div class="dia">' + i + '</div>';
            }
        }
    }

    //Mes anterior//
    document.getElementById("mes-anterior").addEventListener("click", function() {

        mes--;

        if (mes < 0) {
            mes = 11;
            año--;
        }

        mostrarCalendario();
    });

    // Mes siguiente
    document.getElementById("mes-siguiente").addEventListener("click", function() {

        mes++;

        if (mes > 11) {
            mes = 0;
            año++;
        }

        mostrarCalendario();
    });

    mostrarCalendario();
}

//Detalles actividades//

function mostrarActividad(dia) {

    let detalle = document.getElementById("detalle-actividad");

    if (detalle == null) {
        return;
    }

    if (dia == 18) {
        detalle.innerHTML = "<h3>18 de noviembre</h3><p>Leer 30 páginas de El brillo de las luciérnagas.</p><span>Sesión de lectura</span>";
    }

    if (dia == 21) {
        detalle.innerHTML = "<h3>21 de noviembre</h3><p>Compartir mi opinión sobre mi lectura actual.</p><span>Actividad comunitaria</span>";
    }

    if (dia == 25) {
        detalle.innerHTML = "<h3>25 de noviembre</h3><p>Comenzar un nuevo libro de mi lista de pendientes.</p><span>Meta personal</span>";
    }
}

//Agregar actividad//

function agregarActividad() {

    let fecha = document.getElementById("fecha").value;
    let actividad = document.getElementById("actividad").value;

    if (fecha == "" || actividad == "") {
        alert("Completa todos los campos.");
    } else {
        alert("¡Actividad agregada! ♡");
    }
}

//Notas de la comunidad//

// ==========================================
// NOTAS DE LA COMUNIDAD - ENTREPÁGINAS
// ==========================================

if (document.getElementById("formularioNota")) {

    const formulario = document.getElementById("formularioNota");
    const campoTexto = document.getElementById("textoNota");
    const campoNombre = document.getElementById("nombreUsuario");
    const campoCategoria = document.getElementById("categoriaNota");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const seccionNotas = document.querySelector(".notas-comunidad");

    // Arreglo que almacena las notas
    let notas = [];

    // Obtener las notas que ya están escritas en el HTML
    const notasExistentes = seccionNotas.querySelectorAll(".nota-card");

    notasExistentes.forEach((tarjeta, indice) => {

        const enlace = tarjeta.querySelector("a");

        const categorias = [
            "Recomendaciones",
            "Misterio",
            "Retos",
            "Conversaciones"
        ];

        notas.push({
            id: indice + 1,
            usuario: tarjeta.querySelector("h3").textContent,
            nombreUsuario: tarjeta.querySelector("span").textContent,
            contenido: tarjeta.querySelector("p").textContent,
            categoria: categorias[indice] || "Conversaciones",
            likes: 0,
            enlace: enlace ? enlace.getAttribute("href") : "",
            textoEnlace: enlace ? enlace.textContent : ""
        });
    });

    let siguienteId = notas.length + 1;

    // Mostrar las notas en la página
    function mostrarNotas() {

        // Eliminar las tarjetas anteriores
        seccionNotas.querySelectorAll(".nota-card").forEach(tarjeta => {
            tarjeta.remove();
        });

        // Recorrer el arreglo
        notas.forEach(nota => {

            // Aplicar el filtro de categoría
            if (
                filtroCategoria &&
                filtroCategoria.value !== "Todas" &&
                filtroCategoria.value !== nota.categoria
            ) {
                return;
            }

            const tarjeta = document.createElement("article");
            tarjeta.className = "nota-card";

            const usuario = document.createElement("div");
            usuario.className = "nota-usuario";

            const nombre = document.createElement("h3");
            nombre.textContent = nota.usuario;

            const nombreUsuario = document.createElement("span");
            nombreUsuario.textContent = nota.nombreUsuario;

            usuario.appendChild(nombre);
            usuario.appendChild(nombreUsuario);

            const contenido = document.createElement("p");
            contenido.textContent = nota.contenido;

            const categoria = document.createElement("p");
            categoria.textContent = "Categoría: " + nota.categoria;

            const interaccion = document.createElement("div");
            interaccion.className = "nota-interaccion";

            // Botón de Me gusta
            const botonLike = document.createElement("button");
            botonLike.type = "button";
            botonLike.textContent = "Me gusta (" + nota.likes + ")";

            botonLike.addEventListener("click", function () {
                nota.likes++;
                mostrarNotas();
            });

            // Botón para eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.textContent = "Eliminar";

            botonEliminar.addEventListener("click", function () {
                notas = notas.filter(n => n.id !== nota.id);
                mostrarNotas();
            });

            interaccion.appendChild(botonLike);
            interaccion.appendChild(botonEliminar);

            // Conservar los enlaces de las notas originales
            if (nota.enlace) {
                const enlace = document.createElement("a");
                enlace.href = nota.enlace;
                enlace.textContent = nota.textoEnlace;
                interaccion.appendChild(enlace);
            }

            tarjeta.appendChild(usuario);
            tarjeta.appendChild(contenido);
            tarjeta.appendChild(categoria);
            tarjeta.appendChild(interaccion);

            seccionNotas.appendChild(tarjeta);
        });
    }

    // Publicar una nueva nota
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const contenido = campoTexto.value.trim();

        const usuario = campoNombre
            ? campoNombre.value.trim()
            : "Carla López";

        const categoria = campoCategoria
            ? campoCategoria.value
            : "Conversaciones";

        // Validar los campos
        if (contenido === "" || usuario === "" || categoria === "") {
            alert("Completa todos los campos antes de publicar.");
            return;
        }

        // Agregar la nota al arreglo
        notas.push({
            id: siguienteId++,
            usuario: usuario,
            nombreUsuario: "@lector",
            contenido: contenido,
            categoria: categoria,
            likes: 0,
            enlace: "",
            textoEnlace: ""
        });

        // Actualizar la página
        mostrarNotas();

        formulario.reset();

        alert("¡Tu nota se publicó correctamente! ♡ ");
    });

    // Filtrar las notas por categoría
    if (filtroCategoria) {
        filtroCategoria.addEventListener("change", mostrarNotas);
    }

    // Mostrar las notas al entrar
    mostrarNotas();
}

//EXPLORAR LIBROS//
if (document.getElementById("buscarLibro")) {

    const buscador = document.getElementById("buscarLibro");
    const tarjetas = document.querySelectorAll(".libros .libro");
    const botonesGeneros = document.querySelectorAll(".lista-categorias button");

    let generoSeleccionado = "Todos";

    // Categorías de los libros existentes
    const generosLibros = [
        "Terror",
        "Drama",
        "Terror",
        "Fantasía"
    ];

    // Buscar y filtrar libros
    function filtrarLibros() {

        const texto = buscador.value.toLowerCase().trim();

        tarjetas.forEach((libro, indice) => {

            const titulo = libro.querySelector("h3").textContent.toLowerCase();
            const informacion = libro.textContent.toLowerCase();

            const coincideTexto = informacion.includes(texto);

            const coincideGenero =
                generoSeleccionado === "Todos" ||
                generosLibros[indice] === generoSeleccionado;

            if (coincideTexto && coincideGenero) {
                libro.style.display = "";
            } else {
                libro.style.display = "none";
            }
        });
    }

    // Buscar mientras se escribe
    buscador.addEventListener("input", filtrarLibros);

    // Evitar que el formulario recargue la página
    const formularioBusqueda = buscador.closest("form");

    if (formularioBusqueda) {
        formularioBusqueda.addEventListener("submit", function(evento) {
            evento.preventDefault();
            filtrarLibros();
        });
    }

    // Filtrar por género
    botonesGeneros.forEach(boton => {

        boton.addEventListener("click", function() {

            const genero = boton.textContent.trim();

            if (generoSeleccionado === genero) {
                generoSeleccionado = "Todos";
            } else {
                generoSeleccionado = genero;
            }

            filtrarLibros();
        });
    });

    // Agregar libros a la biblioteca
    const botonesAgregar = document.querySelectorAll(".libros .libro button");

    botonesAgregar.forEach((boton, indice) => {

        boton.addEventListener("click", function() {

            const tarjeta = boton.closest(".libro");

            const libroNuevo = {
                titulo: tarjeta.querySelector("h3").textContent,
                autor: tarjeta.querySelectorAll("p")[0].textContent,
                categoria: generosLibros[indice]
            };

            let biblioteca = JSON.parse(
                localStorage.getItem("bibliotecaEntrePaginas") || "[]"
            );

            // Comprobar si el libro ya está agregado
            const existe = biblioteca.some(libro =>
                libro.titulo === libroNuevo.titulo
            );

            if (existe) {
                alert("Este libro ya está en tu biblioteca. ♡");
                return;
            }

            biblioteca.push(libroNuevo);

            localStorage.setItem(
                "bibliotecaEntrePaginas",
                JSON.stringify(biblioteca)
            );

            alert("¡Libro agregado a tu biblioteca! ♡");
        });
    });
}

//BIBLIOTECA//

if (document.querySelector(".resumen-biblioteca")) {

    const seccionLeyendo = document.querySelector(".mis-lecturas .libros");
    const seccionPendientes = document.querySelector(".libros-pendientes .libros");
    const seccionLeidos = document.querySelector(".libros-leidos .libros");

    // Obtener los libros guardados desde Explorar
    let librosGuardados = [];

    try {
        librosGuardados = JSON.parse(
            localStorage.getItem("bibliotecaEntrePaginas") || "[]"
        );
    } catch (error) {
        librosGuardados = [];
    }

    // Mostrar los libros guardados
    function mostrarBiblioteca() {

        // Limpiar los libros agregados anteriormente
        document.querySelectorAll("[data-libro-guardado]").forEach(libro => {
            libro.remove();
        });

        let totalLeidos = 40;
        let totalLeyendo = 1;
        let totalPendientes = 8;

        librosGuardados.forEach((libro, indice) => {

            // Si no tiene estado, comienza como pendiente
            if (!libro.estado) {
                libro.estado = "Pendiente";
            }

            let destino;

            if (libro.estado === "Leyendo") {
                destino = seccionLeyendo;
                totalLeyendo++;
            } else if (libro.estado === "Leído") {
                destino = seccionLeidos;
                totalLeidos++;
            } else {
                destino = seccionPendientes;
                totalPendientes++;
            }

            // Crear tarjeta del libro
            const tarjeta = document.createElement("article");
            tarjeta.className = "libro";
            tarjeta.setAttribute("data-libro-guardado", "true");

            const titulo = document.createElement("h3");
            titulo.textContent = libro.titulo;

            const autor = document.createElement("p");
            autor.textContent = libro.autor || "Autor no especificado";

            // Crear selector de estado
            const selector = document.createElement("select");

            const estados = ["Pendiente", "Leyendo", "Leído"];

            estados.forEach(estado => {
                const opcion = document.createElement("option");
                opcion.value = estado;
                opcion.textContent = estado;
                selector.appendChild(opcion);
            });

            selector.value = libro.estado;

            // Cambiar estado del libro
            selector.addEventListener("change", function() {

                libro.estado = selector.value;

                localStorage.setItem(
                    "bibliotecaEntrePaginas",
                    JSON.stringify(librosGuardados)
                );

                mostrarBiblioteca();
            });

            // Botón para eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.textContent = "Eliminar";

            botonEliminar.addEventListener("click", function() {

                librosGuardados.splice(indice, 1);

                localStorage.setItem(
                    "bibliotecaEntrePaginas",
                    JSON.stringify(librosGuardados)
                );

                mostrarBiblioteca();
            });

            tarjeta.appendChild(titulo);
            tarjeta.appendChild(autor);
            tarjeta.appendChild(selector);
            tarjeta.appendChild(botonEliminar);

            destino.appendChild(tarjeta);
        });

        // Actualizar las estadísticas
        const estadisticas = document.querySelectorAll(".estadistica h3");

        if (estadisticas.length >= 3) {
            estadisticas[0].textContent = totalLeidos;
            estadisticas[1].textContent = totalLeyendo;
            estadisticas[2].textContent = totalPendientes;
        }

        // Guardar los cambios
        localStorage.setItem(
            "bibliotecaEntrePaginas",
            JSON.stringify(librosGuardados)
        );
    }

    // Mostrar la biblioteca al entrar
    mostrarBiblioteca();
}

//CLUBES DE LECTURA//
if (document.querySelector(".clubes-disponibles")) {

    const clubes = document.querySelectorAll(".lista-clubes .club");

    // Recuperar los clubes a los que el usuario pertenece
    let misClubes = [];

    try {
        misClubes = JSON.parse(
            localStorage.getItem("misClubesEntrePaginas") || "[]"
        );
    } catch (error) {
        misClubes = [];
    }

    // Configurar cada club
    clubes.forEach(club => {

        const nombre = club.querySelector("h3").textContent.trim();
        const parrafos = club.querySelectorAll("p");

        // Obtener el número inicial de integrantes
        const parrafoIntegrantes = Array.from(parrafos).find(p =>
            p.textContent.includes("Integrantes:")
        );

        const cantidadInicial = parseInt(
            parrafoIntegrantes.textContent.replace(/\D/g, "")
        );

        const boton = club.querySelector("button");

        boton.type = "button";

        // Actualizar la información del club
        function actualizarClub() {

            const pertenece = misClubes.includes(nombre);

            const cantidad = pertenece
                ? cantidadInicial + 1
                : cantidadInicial;

            parrafoIntegrantes.textContent =
                "Integrantes: " + cantidad;

            boton.textContent = pertenece
                ? "Abandonar club"
                : "Unirme al club";
        }

        // Unirse o abandonar el club
        boton.addEventListener("click", function() {

            if (misClubes.includes(nombre)) {

                // Eliminar el club de la lista personal
                misClubes = misClubes.filter(clubNombre =>
                    clubNombre !== nombre
                );

                alert("Has abandonado el club " + nombre + "." + " ♡ ");

            } else {

                // Agregar el club a la lista personal
                misClubes.push(nombre);

                alert("¡Te has unido al club " + nombre + "!" + " ♡ ");
            }

            // Guardar los cambios
            localStorage.setItem(
                "misClubesEntrePaginas",
                JSON.stringify(misClubes)
            );

            actualizarClub();
        });

        // Mostrar el estado inicial
        actualizarClub();
    });
}

