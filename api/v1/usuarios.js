import { connectDB } from "../../config/db.js";
import Usuario from "../../models/Usuario.js";
import { verificarToken } from "../../middleware/auth.js";

export default async function handler(req, res) {
await verificarToken(req, res, async () => {
    try {
    await connectDB();
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
    } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
    }
});
}


