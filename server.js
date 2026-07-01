/*
 * server.js — Servidor Express de "Mar del Cine"
 * --------------------------------------------------
 * Propósito: Servir archivos estáticos (styles, scripts, modules) y la página
 * principal index.html desde /pages.
 *
 * Módulos usados:
 *   - express: framework HTTP
 *   - path: resolver rutas de directorios (nativo de Node)
 *
 * Funciones principales:
 *   - servir estáticos desde /styles, /scripts, /modules
 *   - ruta raíz "/" sirve pages/index.html
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalente en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aplicacion = express();
const PUERTO = process.env.PORT || 3000;

// Servir directorios estáticos (para que index.html use type="module")
aplicacion.use("/styles", express.static(path.join(__dirname, "styles")));
aplicacion.use("/scripts", express.static(path.join(__dirname, "scripts")));
aplicacion.use("/modules", express.static(path.join(__dirname, "modules")));
aplicacion.use("/images", express.static(path.join(__dirname, "images")));

// Ruta raíz: sirve la página principal
aplicacion.get("/", (_peticion, respuesta) => {
    respuesta.sendFile(path.join(__dirname, "pages", "index.html"));
});

// Iniciar servidor
aplicacion.listen(PUERTO, () => {
    console.log(`Mar del Cine corriendo en http://localhost:${PUERTO}`);
});