const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  cartQuantity: { type: Number, required: true },
  imageUrl: { type: String },
  totalAmount: { type: Number },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
