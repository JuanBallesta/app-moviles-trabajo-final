async function getAll(req, res) {

    // lineas para obtener prodcutos...
    const products = [
        {
            id: 1,
            name: "Escuadra",
            price: 123.45,
        }
    ]

    res.json({ products, message: `Acceso concedido a ${req.user?.username}` });
  }
  
  module.exports = { getAll};