module.exports = (req, res) => {
const nombre = req.query.nombre || "desconocido";
res.json({ mensaje: `Hola, ${nombre}!` });
};
