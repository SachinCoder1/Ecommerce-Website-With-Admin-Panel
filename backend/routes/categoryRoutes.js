const Router = require("express").Router();
const categoryController = require("../controller/categoryController");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

Router.route("/category")
  .get(categoryController.getCategories)
  .post(auth, adminAuth, categoryController.createCategory);

Router.route("/category/:id")
  .put(auth, adminAuth, categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = Router;
