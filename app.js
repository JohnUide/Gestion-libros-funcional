/**
 * Sistema de Gestión de Libros Electrónicos (E-books) - Autónomo 2
 * Paradigma: Programación Orientada a Objetos (POO)
 * Integrante: John Roman
 */

// ==========================================
// 1. INTERFAZ SIMULADA Y MANEJO DE ERRORES
// ==========================================

// Interfaz para la gestión de catálogo
class IGestionCatalogo {
    agregarLibro(libro) {
        throw new Error("El método agregarLibro() debe ser implementado.");
    }
    buscarPorAutor(autor) {
        throw new Error("El método buscarPorAutor() debe ser implementado.");
    }
    buscarPorGenero(genero) {
        throw new Error("El método buscarPorGenero() debe ser implementado.");
    }
}

// ==========================================
// 2. CLASE LIBRO (ENCAPSULACIÓN)
// ==========================================
class Libro {
    // Atributos privados (Encapsulación)
    #id;
    #titulo;
    #autor;
    #genero;
    #leido;

    constructor(id, titulo, autor, genero, leido = false) {
        if (!id || !titulo || !autor || !genero) {
            throw new Error("Error de Validación: Todos los campos del libro son obligatorios.");
        }
        this.#id = id;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#genero = genero;
        this.#leido = Boolean(leido);
    }

    // Getters y Setters
    getId() { return this.#id; }
    getTitulo() { return this.#titulo; }
    getAutor() { return this.#autor; }
    getGenero() { return this.#genero; }
    isLeido() { return this.#leido; }

    marcarComoLeido() {
        this.#leido = true;
    }

    // Representación gráfica
    obtenerDetalles() {
        const estado = this.#leido ? "Leído" : "Pendiente";
        return `[ID: ${this.#id}] "${this.#titulo}" por ${this.#autor} | Género: ${this.#genero} | Estado: ${estado}`;
    }
}

// ==========================================
// 3. CLASE GESTOR BIBLIOTECA (HEREDA INTERFAZ)
// ==========================================
class GestorBiblioteca extends IGestionCatalogo {
    #coleccionLibros;

    constructor() {
        super();
        this.#coleccionLibros = [];
    }

    // Método para agregar un libro con control de errores
    agregarLibro(libro) {
        try {
            if (!(libro instanceof Libro)) {
                throw new Error("Objeto Inválido: Se debe proporcionar una instancia válida de la clase Libro.");
            }
            
            // Validar que no exista un ID duplicado
            const existe = this.#coleccionLibros.some(l => l.getId() === libro.getId());
            if (existe) {
                throw new Error(`Conflicto: Ya existe un libro registrado con el ID ${libro.getId()}.`);
            }

            this.#coleccionLibros.push(libro);
            console.log(`✅ Libro registrado con éxito: "${libro.getTitulo()}"`);
        } catch (error) {
            console.error(`❌ [Error al Agregar]: ${error.message}`);
        }
    }

    // Búsqueda por autor
    buscarPorAutor(autor) {
        try {
            if (!autor) throw new Error("Parámetro requerido: Debe ingresar el nombre del autor.");
            
            const resultados = this.#coleccionLibros.filter(l => 
                l.getAutor().toLowerCase().includes(autor.toLowerCase())
            );

            if (resultados.length === 0) {
                console.log(`ℹ️ No se encontraron libros del autor "${autor}".`);
            }
            return resultados;
        } catch (error) {
            console.error(`❌ [Error de Búsqueda]: ${error.message}`);
            return [];
        }
    }

    // Búsqueda por género
    buscarPorGenero(genero) {
        try {
            if (!genero) throw new Error("Parámetro requerido: Debe ingresar el género.");

            const resultados = this.#coleccionLibros.filter(l => 
                l.getGenero().toLowerCase().includes(genero.toLowerCase())
            );

            if (resultados.length === 0) {
                console.log(`ℹ️ No se encontraron libros del género "${genero}".`);
            }
            return resultados;
        } catch (error) {
            console.error(`❌ [Error de Búsqueda]: ${error.message}`);
            return [];
        }
    }

    // Marcar lectura de libro por ID
    marcarLibroComoLeido(id) {
        try {
            const libro = this.#coleccionLibros.find(l => l.getId() === id);
            if (!libro) {
                throw new Error(`Libro no encontrado: No existe ningún registro con el ID ${id}.`);
            }
            libro.marcarComoLeido();
            console.log(`📖 Libro ID ${id} actualizado: Marcado como leído.`);
        } catch (error) {
            console.error(`❌ [Error en Estado de Lectura]: ${error.message}`);
        }
    }

    // Mostrar catálogo completo
    mostrarCatalogo() {
        console.log("\n=================== CATÁLOGO DE E-BOOKS ===================");
        if (this.#coleccionLibros.length === 0) {
            console.log("La biblioteca está vacía.");
        } else {
            this.#coleccionLibros.forEach(libro => console.log(libro.obtenerDetalles()));
        }
        console.log("============================================================\n");
    }
}

// ==========================================
// 4. DEMOSTRACIÓN DEL SISTEMA
// ==========================================
function ejecutarDemostracion() {
    console.log("=== INICIANDO PRUEBAS DEL SISTEMA E-BOOKS (POO) ===\n");
    const miBiblioteca = new GestorBiblioteca();

    // 1. Agregar Libros Válidos
    try {
        const libro1 = new Libro(1, "Cien Años de Soledad", "Gabriel García Márquez", "Novela Realista");
        const libro2 = new Libro(2, "1984", "George Orwell", "Ciencia Ficción");
        const libro3 = new Libro(3, "El Hobbit", "J.R.R. Tolkien", "Fantasía");

        miBiblioteca.agregarLibro(libro1);
        miBiblioteca.agregarLibro(libro2);
        miBiblioteca.agregarLibro(libro3);
    } catch (error) {
        console.error(error.message);
    }

    // 2. Probar Manejo de Errores (Campos incompletos o ID duplicado)
    console.log("\n--- Probando Manejo de Errores ---");
    try {
        const libroInvalido = new Libro(4, "", "Autor Desconocido", "Drama"); // Faltan datos
    } catch (error) {
        console.error(`❌ [Error Capturado Correctamente]: ${error.message}`);
    }

    const libroDuplicado = new Libro(1, "Otro Libro", "Autor X", "Fantasía");
    miBiblioteca.agregarLibro(libroDuplicado); // Debería lanzar error por ID repetido

    // 3. Mostrar Catálogo Inicial
    miBiblioteca.mostrarCatalogo();

    // 4. Probar Búsquedas
    console.log("--- Búsqueda por Autor ('Orwell') ---");
    const resultadoAutor = miBiblioteca.buscarPorAutor("Orwell");
    resultadoAutor.forEach(l => console.log("Resultado:", l.obtenerDetalles()));

    console.log("\n--- Búsqueda por Género ('Fantasía') ---");
    const resultadoGenero = miBiblioteca.buscarPorGenero("Fantasía");
    resultadoGenero.forEach(l => console.log("Resultado:", l.obtenerDetalles()));

    // 5. Actualizar Estado de Lectura
    console.log("\n--- Actualizar Estado de Lectura ---");
    miBiblioteca.marcarLibroComoLeido(2); // Marcar 1984 como leído
    miBiblioteca.marcarLibroComoLeido(99); // Probar ID inexistente

    // 6. Mostrar Catálogo Final
    miBiblioteca.mostrarCatalogo();
}

// Ejecutar
ejecutarDemostracion();