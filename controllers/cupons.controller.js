const { Op } = require("sequelize");
const db = require("../models/index.model");
const cupon = db.cupons;

// Crear un nuevo cupon.
exports.createCupon = (req, res) => {
  const { code, discount } = req.body;

  cupon
    .create({
      code: code,
      discount: discount,
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Cupon creado.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el cupon.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todos los cupones.
exports.getAllCupons = (req, res) => {
  cupon
    .findAll()
    .then((cupon) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de cupones.",
        status: 200,
        data: cupon,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los cupones.",
        status: 500,
        data: error,
      });
    });
};

// Obtener un cupon.
exports.getOneCupon = (req, res) => {
  const id = req.params.id;
  cupon
    .findOne({
      where: { id: id },
    })
    .then((cuponData) => {
      if (!cuponData) {
        return res.status(404).json({
          ok: false,
          msg: "Cupon no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Cupon encontrado.",
        status: 200,
        data: cuponData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el cupon.",
        status: 500,
        data: error,
      });
    });
};

// Obtener descuento por código promocional
exports.getDiscount = (req, res) => {
  const code = req.query.code; // Aseguramos que estamos usando 'code'
  if (!code || isNaN(code)) {
    return res.status(400).json({
      ok: false,
      msg: "El código promocional proporcionado no es válido.",
      status: 400,
    });
  }

  cupon
    .findOne({
      where: {
        code: { [Op.eq]: code }, // Buscamos el cupón con el código proporcionado
      },
    })
    .then((cuponData) => {
      if (!cuponData) {
        return res.status(404).json({
          ok: false,
          msg: "Cupón no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Cupón encontrado.",
        status: 200,
        data: cuponData,
      });
    })
    .catch((error) => {
      console.error("Error al obtener el cupón:", error);
      res.status(500).json({
        ok: false,
        msg: "Error al procesar la solicitud.",
        status: 500,
        data: error,
      });
    });
};

// Actualizar un cupon.
exports.updateCupon = (req, res) => {
  const id = req.params.id;
  const { code } = req.body;
  const { discount } = req.body;

  cupon
    .update(
      {
        code: code,
        discount: discount,
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
          msg: "Cupon no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Cupon actualizado.",
        status: 200,
        data: affectedRows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el cupon.",
        status: 500,
        data: error,
      });
    });
};

// Eliminar un cupon.
exports.deleteCupon = (req, res) => {
  const id = req.params.id;

  cupon
    .destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).json({
          ok: true,
          msg: "Cupon eliminado.",
          status: 200,
          data: rowsDeleted,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Cupon no encontrado.",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el cupob.",
        status: 500,
        data: error,
      });
    });
};
