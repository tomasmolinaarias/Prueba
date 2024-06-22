import express from "express";
import GestionSharePoint from "../controller/GestionSharePoint.js";
const router = express.Router();

router.get("/", GestionSharePoint.Prueba);

export default router;