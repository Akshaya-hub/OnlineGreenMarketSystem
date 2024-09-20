const mongoose = require('mongoose');

const greenProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  __v: {
    type: Number,
    default: 0,
  },
});

const GreenProduct = mongoose.model('GreenProduct', greenProductSchema);

module.exports = GreenProduct;
