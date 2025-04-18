import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product",
      "name price image"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    // 1. Get product to fetch price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        cart.cartItems.push({
          product: productId,
          quantity,
          price: product.price, // 👈 required
        });
      }

      await cart.save();
      await cart.populate("cartItems.product", "name price image");
      return res.status(200).json(cart);
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [
          {
            product: productId,
            quantity,
            price: product.price, // 👈 required
          },
        ],
      });
      await newCart.save();
      await newCart.populate("cartItems.product", "name price image");
      return res.status(200).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id, "cartItems.product": productId },
      {
        $set: {
          "cartItems.$.quantity": quantity,
        },
      },
      { new: true }
    ).populate("cartItems.product", "name price image");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: {
          cartItems: { product: productId },
        },
      },
      { new: true }
    ).populate("cartItems.product", "name price image");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
