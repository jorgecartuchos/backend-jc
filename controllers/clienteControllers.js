import Cliente from "../models/Cliente.js";
import { enviarEmail } from "../helpers/enviarEmail.js";

export const enviarCorreo = async (req, res) => {
  try {
    const { correo } = req.body;

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      return res
        .status(400)
        .json({ error: "Por favor, ingresa un correo electrónico válido" });
    }

    const cliente = new Cliente(req.body);
    await cliente.save();

    enviarEmail({
      nombre: cliente.nombre,
      correo: cliente.correo,
      asunto: cliente.asunto,
      mensaje: cliente.mensaje,
      activarCarrito: cliente.activarCarrito,
      carrito: cliente.carrito,
    });

    res.status(200).json({ msg: "Correo enviado" });
  } catch (error) {
    res.status(500).json({
      error:
        "La solicitud no se pudo procesar correctamente. Inténtalo de nuevo",
    });
  }
};
