import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  if (!name || !description || !price || !category || !stock || !images) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = req.user;

  if (user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      user: user._id,
    });

    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(200).json([]);
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });

    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProductByKeyword = async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const products = await Product.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;
  const productId = req.params.id;

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.deleteOne();

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
