import express from 'express';
import { fetchUser, loginCustomer, loginDeliveryPartner, refreshToken } from "../controllers/auth/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { updateUser } from "../controllers/tracking/user.js";

const router = express.Router();

router.post('/customer/login', loginCustomer);
router.post('/delivery/login', loginDeliveryPartner);
router.post('/refresh-token', refreshToken);
router.get('/user', verifyToken, fetchUser);  
router.patch('/user', verifyToken, updateUser);

export { router as authRoutes };
