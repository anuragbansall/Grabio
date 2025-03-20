import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// auth routes
app.use("/api/auth", authRouter);

// user routes
app.use("/api/users", userRouter);

// product routes
app.use("/api/products", productRouter);

// cart routes
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
