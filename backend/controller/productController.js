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
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!product_id || !title || !price || !images)
        return res
          .status(400)
          .json({ msg: "Some fields are missing i.e images" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "Product already exist" });

      const createProduct = new Products({
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      });
      await createProduct.save();
      return res.status(200).json({ msg: "Product Added successfully" });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!product_id || !title || !price || !images)
        return res
          .status(400)
          .json({ msg: "Some fields are missing i.e images" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title,
          price,
          description,
          content,
          images,
          category,
        }
      );

      return res.status(200).json({ msg: "Product updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product)
          return res.status(400).json({ msg: "Incorrect product Id" });
  
        await Products.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Product Deleted " });
      res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

module.exports = productController;
