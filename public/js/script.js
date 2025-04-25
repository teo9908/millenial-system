document.addEventListener('DOMContentLoaded', () => {

    
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Función para cargar los productos desde el servidor (API) 

    const cargarProductos = async () => {
        try {
            const respuesta = await fetch('/api/productos'); // Petición al backend
            const productos = await respuesta.json(); // Convertir la respuesta a JSON

            mostrarProductos(productos); // Mostrar los productos en la pagina.
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            contenedorProductos.innerHTML = '<p>Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>';
        }
    };

    
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Función para cargar los productos desde el servidor (API) 

    document.addEventListener('DOMContentLoaded', () => {
        const botonInicio = document.getElementById('inicio');
    
        botonInicio.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Volver al inicio con un efecto suave
        });
    });
    


    
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //---------------------------------- Función para el carrusel principal de la pagina ---------------------------------------------------------------------------------------

    const iniciarCarruselPrincipal = (imagenesContainer) => {
        let currentIndex = 0; // Índice de la imagen actual
        const imagenes = imagenesContainer.querySelectorAll('img'); // Obtener las imágenes
        const totalImagenes = imagenes.length;
    
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImagenes; // Incrementar índice y reiniciar al llegar al final
            imagenesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 3000); // Cambiar de imagen cada 3 segundos
    };
    
    const cargarCarruselPrincipal = async () => {
        try {
            const respuesta = await fetch('/api/productos'); // Cargar productos desde la API
            const productos = await respuesta.json();
            console.log('Productos cargados para el carrusel:', productos); // Log para confirmar los datos
    
            const carruselContainer = document.getElementById('carrusel-principal');
            const imagenesContainer = document.createElement('div');
            imagenesContainer.classList.add('imagenes'); // Contenedor de imágenes
    
            productos.forEach(producto => {
                if (producto.imagenes && producto.imagenes.length > 0) {
                    const img = document.createElement('img');
                    img.src = producto.imagenes[0]; // Usar solo la primera imagen
                    img.alt = `Imagen destacada del producto: ${producto.nombre}`;
                    imagenesContainer.appendChild(img);
                } else {
                    console.warn(`El producto "${producto.nombre}" no tiene imágenes disponibles.`);
                }
            });
    
            carruselContainer.appendChild(imagenesContainer); // Añadir las imágenes al contenedor del carrusel
            iniciarCarruselPrincipal(imagenesContainer); // Inicia el carrusel automático
        } catch (error) {
            console.error('Error al cargar el carrusel principal:', error);
        }
    };
    
    // Inicializar la carga del carrusel principal al cargar la página
    cargarCarruselPrincipal();
    


    
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //---------------------------------- Función para cargar la barra lateral con las categorias de los productos --------------------------------------------------------------

    const cargarCategorias = async () => {
        try {
            const respuesta = await fetch('/api/productos');
            const productos = await respuesta.json();
            const listaCategorias = document.getElementById('lista-categorias-horizontal');
            const categorias = new Map();

            productos.forEach(producto => {
                const nombreCategoria = producto.categoria.includes("_")
                    ? producto.categoria.split("_")[1]
                    : producto.categoria;

                if (!categorias.has(nombreCategoria)) {
                    categorias.set(nombreCategoria, producto.imagenes[0]);
                }
            });

            const categoriasArray = Array.from(categorias.entries());
            const grupo1 = categoriasArray.slice(0, 5); // Primeras 5 categorías
            const grupo2 = categoriasArray.slice(5); // Siguientes 5 categorías

            // Renderizar categorías
            const renderizarCategorias = (grupo) => {
                listaCategorias.innerHTML = ''; // Limpia las categorías actuales

                grupo.forEach(([categoria, imagen]) => {
                    const li = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = imagen;
                    img.alt = `Categoría: ${categoria}`;
                    const texto = document.createElement('span');
                    texto.textContent = categoria;
                    li.appendChild(img);
                    li.appendChild(texto);
                    listaCategorias.appendChild(li);
                });
            };

            // Crear botones
            const botonesContainer = document.createElement('div');
            botonesContainer.classList.add('botones');

            const botonSiguiente = document.createElement('button');
            botonSiguiente.textContent = '';
            const botonAnterior = document.createElement('button');
            botonAnterior.textContent = '';

            // Eventos de los botones
            botonSiguiente.addEventListener('click', () => renderizarCategorias(grupo2));
            botonAnterior.addEventListener('click', () => renderizarCategorias(grupo1));

            botonesContainer.appendChild(botonAnterior);
            botonesContainer.appendChild(botonSiguiente);

            // Renderizar el primer grupo por defecto y agregar los botones
            renderizarCategorias(grupo1);
            listaCategorias.parentElement.appendChild(botonesContainer);
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        }
    };
    // Inicializar la carga de las categorias al cargar la página
    cargarCategorias();


    
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // TODO: Implementar la lógica del carrusel aquí (usando JavaScript adicional o una librería)

    //---------------------------------- Funcion para mostrar productos --------------------------------------------------------------------------------------------------------

    const contenedorProductos = document.getElementById('contenedor-productos');
    const mostrarProductos = (productos) => {
        contenedorProductos.innerHTML = '';

        productos.forEach(producto => {
            const productoHTML = document.createElement('div');
            productoHTML.classList.add('producto');

            // Crear contenedor del carrusel
            const carruselHTML = document.createElement('div');
            carruselHTML.classList.add('carrusel');

            // Contenedor de imágenes
            const imagenesHTML = document.createElement('div');
            imagenesHTML.classList.add('imagenes');

            // Agregar imágenes al carrusel solo si existen
            if (producto.imagenes && producto.imagenes.length > 0) {
                producto.imagenes.forEach((imagen, index) => {
                    console.log(`Ruta generada para la imagen: ${imagen}`);

                    const imgHTML = document.createElement('img');
                    imgHTML.src = imagen; // Usa la ruta directamente desde el JSON
                    imgHTML.alt = `${producto.nombre} - Imagen ${index + 1}`;
                    if (index !== 0) imgHTML.style.display = 'none'; // Mostrar solo la primera imagen
                    imagenesHTML.appendChild(imgHTML);
                });
            } else {
                console.warn(`El producto "${producto.nombre}" no tiene imágenes disponibles.`);
            }

            // Botones de navegación
            const prevButton = document.createElement('button');
            prevButton.classList.add('prev');
            prevButton.textContent = '<';

            const nextButton = document.createElement('button');
            nextButton.classList.add('next');
            nextButton.textContent = '>';

            // Lógica del carrusel
            let currentIndex = 0;
            const imagenes = imagenesHTML.querySelectorAll('img');

            const mostrarImagen = (index) => {
                imagenes.forEach((img, i) => {
                    img.style.display = i === index ? 'block' : 'none';
                });
            };

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
                mostrarImagen(currentIndex);
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % imagenes.length;
                mostrarImagen(currentIndex);
            });

            // Añadir elementos al carrusel
            carruselHTML.appendChild(imagenesHTML);
            carruselHTML.appendChild(prevButton);
            carruselHTML.appendChild(nextButton);

            // Añadir el carrusel al producto
            productoHTML.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio.toLocaleString()}</p>
            `;
            productoHTML.appendChild(carruselHTML);
            contenedorProductos.appendChild(productoHTML);
        });
    };
    // Inicializar la carga de productos al cargar la página
    cargarProductos();

});
