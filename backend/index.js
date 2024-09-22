const port = 4000;
const express = require("express");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path =require("path");
const cors = require("cors");

//Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

//Databse connection
mongoose.connect("mongodb+srv://Thanu:Thanu23@cluster3.hdavn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3/test")

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image storage Engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload =multer({storage:storage})

//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

// app.post("/upload",upload.single('product'),(req,res)=>{
//     res.json({
//         success:1,
//         image_url:`http://localhost:${port}/images/${req.file.filename}`
//     })
// })
app.post('/api/packaging-materials', upload.single('uploadImage'), async (req, res) => {
  try {
    // Construct the new packaging material entry
    const material = new PackagingMaterial({
      packagingMaterial: req.body.packagingMaterial,
      internalMeasurement: req.body.internalMeasurement,
      weightLimit: req.body.weightLimit,
      description: req.body.description,
      uploadImage: req.file ? `/images/${req.file.filename}` : null // Image path
    });

    // Save to the database
    await material.save();
    res.status(201).send(material);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add packaging material.' });
  }
});


//Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product =new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,

    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating API for deleting Products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);

})

// Create a Mongoose Schema
const packagingMaterialSchema = new mongoose.Schema({
    packagingMaterial: String,
    internalMeasurement: String,
    weightLimit: String,
    description: String,
    uploadImage: String, // Assuming you'll save the image file path
  });
  
  const PackagingMaterial = mongoose.model('PackagingMaterial', packagingMaterialSchema);
  
  // Routes
  
  // POST - Add Packaging Material
  app.post('/api/packaging-materials', async (req, res) => {
    try {
      const material = new PackagingMaterial(req.body);
      await material.save();
      res.status(201).send(material);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // GET - Get all Packaging Materials
  app.get('/api/packaging-materials', async (req, res) => {
    try {
      const materials = await PackagingMaterial.find();
      res.status(200).send(materials);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // PUT - Edit Packaging Material
  app.put('/api/packaging-materials/:id', async (req, res) => {
    try {
      const material = await PackagingMaterial.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!material) {
        return res.status(404).send();
      }
      res.status(200).send(material);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // DELETE - Delete Packaging Material
  app.delete('/api/packaging-materials/:id', async (req, res) => {
    try {
      const material = await PackagingMaterial.findByIdAndDelete(req.params.id);
      if (!material) {
        return res.status(404).send();
      }
      res.status(200).send({ message: 'Material deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Define Packing Order Schema
const PackingOrderSchema = new mongoose.Schema({
  pa_id: String,
  pro_id: String,
  o_id: String,
  quantity: Number,
  material: String,
  internalMeasurement: String,
  customWrap: String, // URL to image or a value like 'striped'
  customNote: String,
  deliverDate: String,
  status: String // For example, 'Delivered', 'Pending'
});

// Create Model
const PackingOrder = mongoose.model('PackingOrder', PackingOrderSchema);

// API to get all packing orders
app.get('/api/packing-orders', async (req, res) => {
  try {
    const orders = await PackingOrder.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API to update a packing order status
app.put('/api/packing-orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await PackingOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const GreenProduct = require('./models/Product');

app.get('/api/cartdatas' , async (req, res) => {
  try{
      const products = await GreenProduct.find();
      res.json(products);
  } catch(error){
      console.error(error);
      res.status(500).json({message: "Server Error"});
  }
});

const getProductById = async (req, res) => {
  try{
      const product = await Product.findById(req.params.id);
      res.json(product);
  } catch(error){
      console.error(error);
      res.status(500).json({message: "Server Error"});
  }
};


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port " + port)
    }
    else{
        console.log("Error: "+error)
    }
})















