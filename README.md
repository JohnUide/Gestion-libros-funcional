# Gestion-libros-funcional
Etapa 1 - Sistema de Gestion de E-books utilizando programacion funcional en JavaScript
# Sistema de Gestión de Libros Electrónicos (E-books)
## Etapa 1: Planeación del Software
*   **Entorno:** Visual Studio Code
*   **Lenguaje:** JavaScript (Paradigma Funcional)
*   **Modalidad:** Proyecto Individual (Grupo de 1)

### Alcance del Proyecto
El sistema permitirá administrar en memoria un catálogo de libros electrónicos empleando funciones puras e inmutabilidad. 

### Módulos del Sistema
1. **Catálogo:** Registro de libros con propiedades `id`, `titulo`, `autor`, `genero` y `leido`.
2. **Búsqueda:** Filtrado dinámico por autor o género usando el método nativo `.filter()`.
3. **Progreso:** Actualización del estado de lectura devolviendo nuevas colecciones usando el método nativo `.map()`.

# Sistema de Gestión de Libros Electrónicos (E-books) - Etapa 2 (POO)

* **Entorno:** Visual Studio Code
* **Lenguaje:** JavaScript (Programación Orientada a Objetos)
* **Modalidad:** Proyecto Individual (John Roman)

## Características Implementadas (Unidad 3)
* **Encapsulación:** Atributos privados (`#id`, `#titulo`, `#autor`, `#genero`, `#leido`).
* **Interfaces:** Implementación simulada mediante la clase `IGestionCatalogo`.
* **Manejo de Errores:** Validaciones y control de excepciones con `try / catch`.

## Estructura de Clases
* `Libro`: Entidad principal encapsulada.
* `GestorBiblioteca`: Clase que administra la colección e implementa la interfaz de gestión.

# Sistema de Gestión de Libros Electrónicos (E-books) - Etapa 3 (API REST & Servicios Web)

* **Entorno:** Visual Studio Code & Node.js
* **Lenguaje / Framework:** JavaScript (Express.js)
* **Modalidad:** Proyecto Individual (John Roman)

---

### Características Implementadas (Unidad 4)

* **Arquitectura API REST:** Despliegue de un servidor HTTP local para la gestión de e-books.
* **Formatos de Datos:** Recepción y envío de respuestas serializadas en JSON con códigos de estado HTTP estandarizados (`200`, `201`, `400`, `404`).
* **Operaciones CRUD:** Cobertura de métodos `GET`, `POST`, `PATCH`, `PUT` y `DELETE`.

---

### Endpoints de la API (8 Servicios Web)

* `GET /api/libros` - Obtener el catálogo completo de e-books.
* `GET /api/libros/:id` - Consultar un e-book específico por su ID.
* `GET /api/libros/genero/:genero` - Filtrar e-books por género literario.
* `POST /api/libros` - Registrar un nuevo e-book en la base de datos.
* `PATCH /api/libros/:id/leido` - Marcar un e-book como leído.
* `PUT /api/libros/:id/calificar` - Asignar una calificación (1 a 5 estrellas).
* `GET /api/estadisticas` - Obtener métricas y porcentajes de lectura.
* `DELETE /api/libros/:id` - Eliminar un e-book del catálogo.
