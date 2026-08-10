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
