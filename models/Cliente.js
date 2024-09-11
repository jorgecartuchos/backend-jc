import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      trim: true,
      required: true,
    },
    asunto: {
      type: String,
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
    carrito: [
      {
        id: {
          type: Number,
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        info: {
          type: String,
          required: true,
        },
      },
    ],
    activarCarrito: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
