const server =  require("fastify")();
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || "recetas:4000";

const opciones = {
    agent: new https.Agent({
        ca: fs.readFileSync(__dirname + "/shared/tls/certificado-publico.cert")
    })

};

server.get('/', async () => {
    const solicitud = await fetch(`https://${TARGET}/recetas/42`, opciones);
    const payload = await solicitud.json();

    return {
        pid: process.pid,
        data_servicio: payload
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Corriendo en http://${HOST}:${PORT}/`);
});


