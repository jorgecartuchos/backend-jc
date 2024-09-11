import express from "express";

import { enviarCorreo } from "../controllers/clienteControllers.js";

const router = express.Router();

router.post("/contactanos", enviarCorreo);

export default router;
