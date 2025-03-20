import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import categoryRouter from "./routes/category.routes.js";
import reviewRouter from "./routes/review.routes.js";

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

// order routes
app.use("/api/orders", orderRouter);

// payment routes
app.use("/api/payment", paymentRouter);

// category routes
app.use("/api/categories", categoryRouter);

// review routes
app.use("/api/reviews", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
