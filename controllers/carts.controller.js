const db = require("../models/index.model");
const cart = db.carts;

// Crear un nuevo carrito.
exports.createCart = (req, res) => {
  const { totalCost, date, state } = req.body;

  cart
    .create({
      totalCost: totalCost,
      date: date,
      state: state,
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Carrito creado.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el carrito.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todos los carritos.
exports.getAllCarts = (req, res) => {
  cart
    .findAll()
    .then((carts) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de carritos.",
        status: 200,
        data: carts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los carritos.",
        status: 500,
        data: error,
      });
    });
};

// Obtener un carrito.
exports.getOneCart = (req, res) => {
  const id = req.params.id;
  cart
    .findOne({
      where: { id: id },
    })
    .then((cartData) => {
      if (!cartData) {
        return res.status(404).json({
          ok: false,
          msg: "Carrito no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Carrito encontrado.",
        status: 200,
        data: cartData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el carrito.",
        status: 500,
        data: error,
      });
    });
};
