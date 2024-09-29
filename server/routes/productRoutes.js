const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById,updateProduct,deleteProduct } = require("../controller/productController");


router.get("/", getAllProducts, (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
});


router.get("/:id", getProductById);


router.put("/:id", updateProduct);


router.delete("/:id", deleteProduct);

module.exports = router;