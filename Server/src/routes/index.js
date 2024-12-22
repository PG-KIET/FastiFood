import { authRoutes } from "./auth.js";
import { orderRoutes } from "./order.js";
import { productRouter } from "./product.js";
import { categoryRouter } from "./category.js";

const prefix = '/api';

export const registerRoutes = (app) => {
    app.use(prefix, authRoutes);
    app.use(prefix, productRouter);
    app.use(prefix, categoryRouter);
    app.use(prefix, orderRoutes);
};
