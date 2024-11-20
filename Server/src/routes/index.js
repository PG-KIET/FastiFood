import { authRoutes } from "./auth.js";
import { orderRoutes } from "./order.js";
import { categoryRouter, productRouter } from "./product.js";

const prefix = '/api';

export const registerRoutes = (app) => {
    app.use(prefix, authRoutes);
    app.use(prefix, productRouter);
    app.use(prefix, categoryRouter);
    app.use(prefix, orderRoutes);
};
