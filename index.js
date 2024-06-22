// En index.js
import express from "express";
import { load as middlewareLoad } from "./src/middleware/loadMidleware.js";
import { load as routerLoad } from "./src/router/loadRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

middlewareLoad(app);
routerLoad(app);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Puerto Activo 🟢 📤 http://localhost:${PORT}`));
