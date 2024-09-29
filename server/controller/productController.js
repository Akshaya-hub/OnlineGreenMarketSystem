const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update product" });
    }
  };
  
  // Delete Product
  const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  };

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};