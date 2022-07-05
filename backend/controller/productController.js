const Products = require("../models/productModal");

const productController = {
  getProducts: async (req, res) => {
    try {
      const allProducts = Products.find({});
      res.status(200).json(allProducts);
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
        const {product_id, title, price, description, content, images, category} = req.body;
        if(!product_id || !title || !price || !images) return res.status(400).json({msg: "Some fields are missing i.e images"})


      res.status(200).json({msg: "Product Added successfully"});
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

module.exports = productController;
