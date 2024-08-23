const db = require("../models/index.model");
const product = db.productTypes;

// Crear un nuevo producto.
exports.createProduct = (req, res) => {
  const { description, price } = req.body;

  product
    .create({
      description: description,
      price: price,
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Producto creado.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el producto.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todos los productos.
exports.getAllProducts = (req, res) => {
  product
    .findAll()
    .then((products) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de productos.",
        status: 200,
        data: products,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los productos.",
        status: 500,
        data: error,
      });
    });
};

// Obtener un producto.
exports.getOneProduct = (req, res) => {
  const id = req.params.id;
  product
    .findOne({
      where: { id: id },
    })
    .then((productData) => {
      if (!productData) {
        return res.status(404).json({
          ok: false,
          msg: "Producto no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Producto encontrado.",
        status: 200,
        data: productData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el producto.",
        status: 500,
        data: error,
      });
    });
};

// Actualizar un producto.
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { description, price } = req.body;

  product
    .update(
      {
        description: description,
        price: price,
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
          msg: "Producto no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Producto actualizado.",
        status: 200,
        data: affectedRows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el producto.",
        status: 500,
        data: error,
      });
    });
};

// Eliminar un producto.
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  product
    .destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).json({
          ok: true,
          msg: "Producto eliminado.",
          status: 200,
          data: rowsDeleted,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Producto no encontrado.",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el producto.",
        status: 500,
        data: error,
      });
    });
};
