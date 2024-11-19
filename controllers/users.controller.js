const db = require("../models/index.model");
const user = db.users;

// Crear un nuevo usuario.
exports.createUser = (req, res) => {
  const { name, last_name, username, email, password } = req.body;

  user
    .create({
        name: name, 
        last_name: last_name, 
        username: username,
        email: email, 
        password: password
    })
    .then((register) => {
      res.status(201).json({
        ok: true,
        msg: "Usuario creado.",
        status: 201,
        data: register,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el usuario.",
        status: 500,
        data: error,
      });
    });
};

// Obtener todos los usuario.
exports.getAllUsers = (req, res) => {
  user
    .findAll()
    .then((users) => {
      res.status(200).json({
        ok: true,
        msg: "Lista de usuarios.",
        status: 200,
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los usuarios.",
        status: 500,
        data: error,
      });
    });
};

// Obtener un usuario.
exports.getOneUser = (req, res) => {
  const id = req.params.id;
  user
    .findOne({
      where: { id: id },
    })
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Usuario encontrado.",
        status: 200,
        data: userData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener el usuario.",
        status: 500,
        data: error,
      });
    });
};

// Actualizar un usuario.
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, last_name, username, email, password } = req.body;

  user
    .update(
      {
        name: name, 
        last_name: last_name, 
        username: username, 
        email: email, 
        password: password
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
          msg: "Usuario no encontrado.",
          status: 404,
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Usuario actualizado.",
        status: 200,
        data: affectedRows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el usuario.",
        status: 500,
        data: error,
      });
    });
};

// Eliminar un usuario.
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  user
    .destroy({ where: { id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).json({
          ok: true,
          msg: "Usuario eliminado.",
          status: 200,
          data: rowsDeleted,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado.",
          status: 404,
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar el usuario.",
        status: 500,
        data: error,
      });
    });
};

