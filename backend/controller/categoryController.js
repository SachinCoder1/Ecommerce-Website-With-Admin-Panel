const Category = require("../models/categorySchema");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (name) return res.status(400).json({ msg: "Category already Exist!" });

      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json({ msg: "Category Created" });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ id: req.params.id }, { name });
      return res.status(200).json({ msg: "Category Updated" });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category)
        return res.status(400).json({ msg: "Incorrect category Id" });

      await Category.findByIdAndDelete(id);
      return res.status(200).json({ msg: "Category Deleted " });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
