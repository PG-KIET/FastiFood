import express from 'express';
import { confirmOrder, createOrder, getOrders, getOrdersById, updateOrderStatus } from "../controllers/order/order.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);  // Đảm bảo tất cả các route đều cần xác thực

router.post("/order", createOrder);
router.get("/order", getOrders);
router.patch("/order/:orderId/status", updateOrderStatus);
router.post("/order/:orderId/confirm", confirmOrder);
router.get("/order/:orderId", getOrdersById); // Dùng GET cho lấy order theo ID

export { router as orderRoutes };
