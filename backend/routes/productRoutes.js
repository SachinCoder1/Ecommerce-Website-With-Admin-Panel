const Router = require("express").Router();
const productController = require("../controller/productController");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

Router.route("/product")
  .get(productController.getProducts)
  .post(auth, adminAuth, productController.createProduct);

Router.route("/product/:id")
  .put(auth, adminAuth, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = Router;
