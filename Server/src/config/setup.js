import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";  
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
import { dark, light, noSidebar } from '@adminjs/themes';

// console.log("Registering Mongoose Adapter for AdminJS...");
AdminJS.registerAdapter(AdminJSMongoose);
// console.log("Mongoose Adapter registered successfully");

export const admin = new AdminJS({
    resources: [
        { resource: Models.Customer, options: { listProperties: ["phone", "role", "isActivated"], filterProperties: ["phone", "role"] } },
        { resource: Models.DeliveryPartner, options: { listProperties: ["email", "role", "isActivated"], filterProperties: ["email", "role"] } },
        { resource: Models.Admin, options: { listProperties: ["email", "role", "isActivated"], filterProperties: ["email", "role"] } },
        { resource: Models.Branch },
        { resource: Models.Product },
        { resource: Models.Category },
        { resource: Models.Order },
        { resource: Models.Counter },
    ],
    branding: {
        companyName: "FastiFood",
        withMadeWithLove: false,
        favicon: "https://res.cloudinary.com/dn6etzkjm/image/upload/v1729667146/kedjtuz0m6xg6utqoa7v.png",
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin",
});

// console.log("AdminJS initialized with resources and branding");

export const buildAdminRouter = async (app) => {
    // console.log("Building AdminJS router...");
    try {
        await AdminJSExpress.buildAuthenticatedRouter(
            admin,
            {
                authenticate,
                cookiePassword: COOKIE_PASSWORD,
                cookieName: "adminjs"
            },
            app,
            {
                store: sessionStore,
                saveUninitialized: false,
                resave: false,
                secret: COOKIE_PASSWORD,
                cookie: {
                    httpOnly: process.env.NODE_ENV === "production",
                    secure: process.env.NODE_ENV === "production",
                }
            }
        );
        // console.log(buildAdminRouter)
        // console.log("AdminJS router built successfully");
    } catch (error) {
        console.error("Error building AdminJS router:", error);
    }
};
