const { Op, where, and } = require("sequelize");
const db = require("../models/index.model");
const IceCreamTaste = db.iceCreamTastes;

// Crear un nuevo gusto de helado.
exports.createTaste = (req, res) => {
  const {
    taste,
    ingredients,
    shortDescription,
    nutritionalValue,
    photos,
    stock,
    categorie,
    productType,
  } = req.body;
  console.log(req.body);
  IceCreamTaste.create({
    taste: taste,
    ingredients: ingredients,
    shortDescription: shortDescription,
    nutritionalValue: nutritionalValue,
    photos: photos,
    stock: stock,
    categoryId: categorie,
    productTypeId: productType,
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
  IceCreamTaste.findAll({
    include: [
      {
        model: db.categories,
      },
      {
        model: db.productTypes,
      },
    ],
  })
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

// Filtros
exports.list = (req, res) => {
  const pagina = parseInt(req.query.pagina);
  const cantidad = parseInt(req.query.cantidad);
  const text = req.query.filtro;
  const categories = req.query.categories;
  const productTypes = req.query.productTypes;

  console.log("llega a lista", productTypes);

  let whereFilter = {};

  if (
    (text && text.length > 0) ||
    (categories && categories.length > 0) ||
    (productTypes && productTypes.length > 0)
  ) {
    whereFilter[Op.and] = [];

    if (text && text.length > 0) {
      whereFilter[Op.and].push({
        taste: { [Op.like]: `%${text}%` },
      });
    }

    if (categories && categories.length > 0) {
      const categoriesVector = categories.split(",");
      whereFilter[Op.and].push({
        categoryId: categoriesVector,
      });
    }

    if (productTypes && productTypes.length > 0) {
      const productTypesVector = productTypes.split(",");
      whereFilter[Op.and].push({
        productTypeId: productTypesVector,
      });
    }
  }
  IceCreamTaste.findAndCountAll({
    where: whereFilter,
    include: [
      {
        model: db.categories,
      },
      {
        model: db.productTypes,
      },
    ],
    offset: (pagina - 1) * cantidad,
    limit: cantidad,
  })
    .then((tastes) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de gustos de helado.",
        status: 200,
        data: tastes,
      });
    })
    .catch((error) => {
      console.log(error);
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
  IceCreamTaste.findOne({
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
  const {
    taste,
    ingredients,
    shortDescription,
    nutritionalValue,
    photos,
    stock,
    categorie,
    productType,
  } = req.body;

  IceCreamTaste.update(
    {
      taste: taste,
      ingredients: ingredients,
      shortDescription: shortDescription,
      nutritionalValue: nutritionalValue,
      photos: photos,
      stock: stock,
      categoryId: categorie,
      productTypeId: productType,
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

  IceCreamTaste.destroy({ where: { id: id } })
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
