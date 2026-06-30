import express from "express";
import docsRouter from "./api/docs.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/docs", docsRouter);

app.get("/", (req, res) => {
res.json({ mensaje: "API funcionando con Swagger 🚀" });
});

app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});
