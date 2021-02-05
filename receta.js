const { request } = require("https");

const server = require("fastify")();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

console.log(`Proceso pid =${process.pid}`);

server.get('/recetas/:id', async (request, response) => {
    console.log(`Proceso de atencion de solicitud pid=${process.pid}`);
    const id = Number(request.params.id);
    if (id !== 42) {
        response.statusCode = 404;
        return { error : "Receta no encontrada" };
    }
    return {
        pid : process.pid,
        receta : {
            id,
            nombre: "Taco de pollo",
            pasos: "Agarras una tortilla y échale pollo",
            ingradientes: [
                {id: 1, nombre: "Tortilla", cantidad: "2 unidades"},
                {id: 2, nombre: "Pollo", cantidad: "80 grs"}
            ]
        }
    };
});

server.listen(PORT, HOST, () =>{
    console.log(`Servidor ejecutandose en http://${HOST}:${PORT}`);
});