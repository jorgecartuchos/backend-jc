import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import compression from "compression";

import clienteRoutes from "./routes/clienteRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

app.use(compression());

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOption = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por cors"));
    }
  },
};

app.use(cors(corsOption));

app.use("/api/toners", clienteRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor conectado en el puerto ${port}`);
});
