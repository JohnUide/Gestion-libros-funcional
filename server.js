/**
 * Proyecto Integrador Final - Sistema de Gestión de E-books
 * Unidad 4: API REST con Express (8 Servicios Web en JSON)
 * Estudiante: John Roman | UIDE
 */

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Base de datos en memoria
let biblioteca = [
    { id: 1, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Novela", leido: true, calificacion: 5 },
    { id: 2, titulo: "1984", autor: "George Orwell", genero: "Ciencia Ficción", leido: false, calificacion: 0 },
    { id: 3, titulo: "El Hobbit", autor: "J.R.R. Tolkien", genero: "Fantasía", leido: true, calificacion: 4 }
];

// 1. Servicio Web GET: Obtener todos los libros
app.get('/api/libros', (req, res) => {
    res.status(200).json({ status: "éxito", total: biblioteca.length, datos: biblioteca });
});

// 2. Servicio Web GET: Obtener un libro por ID
app.get('/api/libros/:id', (req, res) => {
    const libro = biblioteca.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).json({ status: "error", mensaje: "Libro no encontrado" });
    res.status(200).json({ status: "éxito", datos: libro });
});

// 3. Servicio Web GET: Filtrar libros por Género
app.get('/api/libros/genero/:genero', (req, res) => {
    const filtrados = biblioteca.filter(l => l.genero.toLowerCase() === req.params.genero.toLowerCase());
    res.status(200).json({ status: "éxito", total: filtrados.length, datos: filtrados });
});

// 4. Servicio Web POST: Registrar un nuevo libro
app.post('/api/libros', (req, res) => {
    const { titulo, autor, genero } = req.body;
    if (!titulo || !autor || !genero) {
        return res.status(400).json({ status: "error", mensaje: "Todos los campos son obligatorios" });
    }
    const nuevoLibro = { id: biblioteca.length + 1, titulo, autor, genero, leido: false, calificacion: 0 };
    biblioteca.push(nuevoLibro);
    res.status(201).json({ status: "éxito", mensaje: "Libro creado", datos: nuevoLibro });
});

// 5. Servicio Web PATCH: Marcar libro como leído
app.patch('/api/libros/:id/leido', (req, res) => {
    const libro = biblioteca.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).json({ status: "error", mensaje: "Libro no encontrado" });
    libro.leido = true;
    res.status(200).json({ status: "éxito", mensaje: "Estado actualizado a leído", datos: libro });
});

// 6. Servicio Web PUT: Calificar un libro (1 a 5)
app.put('/api/libros/:id/calificar', (req, res) => {
    const { calificacion } = req.body;
    const libro = biblioteca.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).json({ status: "error", mensaje: "Libro no encontrado" });
    if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ status: "error", mensaje: "La calificación debe ser entre 1 y 5" });
    }
    libro.calificacion = calificacion;
    res.status(200).json({ status: "éxito", mensaje: "Calificación asignada", datos: libro });
});

// 7. Servicio Web GET: Obtener estadísticas de lectura
app.get('/api/estadisticas', (req, res) => {
    const total = biblioteca.length;
    const leidos = biblioteca.filter(l => l.leido).length;
    res.status(200).json({
        status: "éxito",
        estadisticas: { totalLibros: total, leidos, pendientes: total - leidos, porcentajeLectura: `${((leidos / total) * 100).toFixed(1)}%` }
    });
});

// 8. Servicio Web DELETE: Eliminar un libro
app.delete('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = biblioteca.findIndex(l => l.id === id);
    if (indice === -1) return res.status(404).json({ status: "error", mensaje: "Libro no encontrado" });
    const eliminado = biblioteca.splice(indice, 1);
    res.status(200).json({ status: "éxito", mensaje: "Libro eliminado", datos: eliminado[0] });
});

app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`));
