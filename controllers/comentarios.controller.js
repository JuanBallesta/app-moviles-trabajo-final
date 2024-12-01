const db = require("../models/index.model");
const comentario = db.comentarios;

// Crear un nuevo comentario.
exports.createComentario = (req, res) => {
  const { description, iceCreamTasteId } = req.body;

  comentario
    .create({
      description: description,
      iceCreamTasteId: iceCreamTasteId,
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Comentario creada.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el comentario.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todos los comentarios.
exports.getAllComentarios = (req, res) => {
  comentario
    .findAll({
      include: [
        {
          model: db.iceCreamTastes,
        },
      ],
    })
    .then((comentarios) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de comentarios.",
        status: 200,
        data: comentarios,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener las comentarios.",
        status: 500,
        data: error,
      });
    });
};

// Obtener una comentario.
exports.getOneComentario = (req, res) => {
  const id = req.params.id;
  comentario
    .findOne({
      where: { id: id },
    })
    .then((comentarioData) => {
      if (!comentarioData) {
        return res.status(404).json({
          ok: false,
          msg: "Comentario no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Comentario encontrado.",
        status: 200,
        data: comentarioData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el comentario.",
        status: 500,
        data: error,
      });
    });
};

// Obtener comentarios de un producto específico
exports.getComment = (req, res) => {
  const _id = req.params.idProducto;

  Comentarios.findAll({
    where: { iceCreamTasteId: _id },
    attributes: ["description", ["iceCreamTasteId", "IdProducto"]],
    include: [
      {
        model: IceCreamTastes,
        as: "productDetails", // Alias configurado en la relación
        attributes: [["taste", "Producto"]],
      },
    ],
  })
    .then((comentarios) => {
      if (!comentarios.length) {
        return res.status(404).json({
          ok: false,
          msg: "No hay comentarios para este producto.",
          status: 404,
        });
      }

      res.status(200).json({
        ok: true,
        msg: "Comentarios encontrados.",
        status: 200,
        data: comentarios,
      });
    })
    .catch((error) => {
      console.error("Error al obtener los comentarios:", error.message);
      res.status(500).json({
        ok: false,
        msg: "Error al procesar la solicitud.",
        status: 500,
      });
    });
};

// // Actualizar una comentario.
// exports.updateComentario = (req, res) => {
//   const id = req.params.id;
//   const { description } = req.body;

//   comentario
//     .update(
//       {
//         description: description,
//         iceCreamTasteId: iceCreamTasteId,
//       },
//       {
//         where: { id: id },
//         returning: true,
//       }
//     )
//     .then(([affectedCount, affectedRows]) => {
//       if (affectedCount === 0) {
//         return res.status(404).json({
//           ok: false,
//           msg: "Comentario no encontrado.",
//           status: 404,
//         });
//       }
//       res.status(200).json({
//         ok: true,
//         msg: "Comentario actualizado.",
//         status: 200,
//         data: affectedRows[0],
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         ok: false,
//         msg: "Error al actualizar el comentario.",
//         status: 500,
//         data: error,
//       });
//     });
// };

// Eliminar una comentario.
exports.deleteComentario = (req, res) => {
  const id = req.params.id;

  comentario
    .destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).json({
          ok: true,
          msg: "Comentario eliminado.",
          status: 200,
          data: rowsDeleted,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Comentario no encontrado.",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el comentario.",
        status: 500,
        data: error,
      });
    });
};
