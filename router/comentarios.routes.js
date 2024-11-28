const Routes = require("express").Router();
const comentarioController = require("../controllers/comentarios.controller");

Routes.post("/", comentarioController.createComentario);
Routes.get("/", comentarioController.getAllComentarios);
Routes.get("/:id", comentarioController.getOneComentario);
Routes.get("/getComment", comentarioController.getComment);
// Routes.put("/:id", comentarioController.updateComentario);
Routes.delete("/:id", comentarioController.deleteComentario);

module.exports = Routes;
