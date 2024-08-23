const db = require("../models/index.model");
const taste = db.iceCreamTastes;

// Crear un nuevo gusto de helado.
exports.createTaste = (req, res) => {
  const { tasteName, ingredients, shortDescription, nutritionalValue, photos } =
    req.body;

  taste
    .create({
      tasteName: tasteName,
      ingredients: ingredients,
      shortDescription: shortDescription,
      nutritionalValue: nutritionalValue,
      photos: photos,
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Gusto de helado creado.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el gusto de helado.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todos los gustos de helado.
exports.getAllTastes = (req, res) => {
  taste
    .findAll()
    .then((tastes) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de gustos de helado.",
        status: 200,
        data: tastes,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los gustos de helado.",
        status: 500,
        data: error,
      });
    });
};

// Obtener un gusto de helado.
exports.getOneTaste = (req, res) => {
  const id = req.params.id;
  taste
    .findOne({
      where: { id: id },
    })
    .then((tasteData) => {
      if (!tasteData) {
        return res.status(404).json({
          ok: false,
          msg: "Gusto de helado no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Gusto de helado encontrado.",
        status: 200,
        data: tasteData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el gusto de helado.",
        status: 500,
        data: error,
      });
    });
};

// Actualizar un gusto de helado.
exports.updateTaste = (req, res) => {
  const id = req.params.id;
  const { tasteName, ingredients, shortDescription, nutritionalValue, photos } =
    req.body;

  taste
    .update(
      {
        tasteName: tasteName,
        ingredients: ingredients,
        shortDescription: shortDescription,
        nutritionalValue: nutritionalValue,
        photos: photos,
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
          msg: "Gusto de helado no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Gusto de helado actualizado.",
        status: 200,
        data: affectedRows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el gusto de helado.",
        status: 500,
        data: error,
      });
    });
};

// Eliminar un gusto de helado.
exports.deleteTaste = (req, res) => {
  const id = req.params.id;

  taste
    .destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).json({
          ok: true,
          msg: "Gusto de helado eliminado.",
          status: 200,
          data: rowsDeleted,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Gusto de helado no encontrado.",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el gusto de helado.",
        status: 500,
        data: error,
      });
    });
};
