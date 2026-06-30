import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Usuario from "../../models/Usuario.js";
import { connectDB } from "../../config/db.js";

dotenv.config();

export default async function handler(req, res) {
if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
}

const { email, password } = req.body;

try {
    await connectDB();

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
    return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
    return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    res.status(200).json({ token });
} catch (error) {
    res.status(500).json({ error: "Error en el servidor", detalle: error.message });
}
}
