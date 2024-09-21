const CartItem = require('../models/cartItems'); // Correct model import

const posToCart = async (req, res) => {
  const { cartItems: cartItemArray, totalAmount, totalQuality } = req.body; 

  if (!cartItemArray || cartItemArray.length === 0) {
    return res.status(400).json({ message: "No item in cart" });
  }

  try {
    
    const savedItems = await CartItem.insertMany(cartItemArray.map(item => ({
      name: item.name,
      description: item.description,
      price: item.price,
      cartQuantity: item.cartQuantity,
      imageUrl: item.imageUrl,  
      totalAmount: item.price * item.cartQuantity,
    })));

   
    return res.status(200).json({ message: "success", savedItems, totalAmount, totalQuality });
  } catch (err) {
    
    return res.status(500).json({ message: 'Failed to checkout', error: err });
  }
};

const getFromCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find(); 
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error });
  }
};

module.exports = { getFromCart, posToCart };
