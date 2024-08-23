const db = require("../models/index.model");
const categorie = db.categories;

// Crear una nueva categoria.
exports.createCategorie = (req, res) => {
  const { description } = req.body;

  categorie
    .create({
      description: description,
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Categoria creada.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear la categoria.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todas las categorias.
exports.getAllCategories = (req, res) => {
  categorie
    .findAll()
    .then((categories) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de categorias.",
        status: 200,
        data: categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener las categorias.",
        status: 500,
        data: error,
      });
    });
};

// Obtener una categoria.
exports.getOneCategorie = (req, res) => {
  const id = req.params.id;
  categorie
    .findOne({
      where: { id: id },
    })
    .then((categorieData) => {
      if (!categorieData) {
        return res.status(404).json({
          ok: false,
          msg: "Categoria no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Categoria encontrado.",
        status: 200,
        data: categorieData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener la categoria.",
        status: 500,
        data: error,
      });
    });
};

// Actualizar una categoria.
exports.updateCategorie = (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  categorie
    .update(
      {
        description: description,
      },
      {
        where: { id: id },
        returning: true,
      }
    )
    .then(([affectedCount, affectedRows]) => {
      if (affectedCount === 0) {
        return res.status(404).json({
          ok: false,
          msg: "Categoria no encontrada.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Categoria actualizada.",
        status: 200,
        data: affectedRows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar la categoria.",
        status: 500,
        data: error,
      });
    });
};

// Eliminar una categoria.
exports.deleteCategorie = (req, res) => {
  const id = req.params.id;

  categorie
    .destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).json({
          ok: true,
          msg: "Categoria eliminada.",
          status: 200,
          data: rowsDeleted,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Categoria no encontrada.",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar la categoria.",
        status: 500,
        data: error,
      });
    });
};
