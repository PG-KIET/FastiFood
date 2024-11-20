import 'dotenv/config';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { Admin } from '../models/index.js';

const MongoDBStore = ConnectMongoDBSession(session);

// console.log("Initializing MongoDB session store...");
export const sessionStore = new MongoDBStore({
    mongoUrl: process.env.MONGO_URI,  // Kết nối đến MongoDB thông qua biến môi trường
    collection: 'sessions'
});

sessionStore.on("error", (error) => {
    console.error("Session store error:", error);  // Log lỗi nếu có
});


export const authenticate = async (email, password) => {
    console.log('Authenticating user with email:', email);

    if (email && password) {
        console.log('Email and password provided');
        const user = await Admin.findOne({ email });
        if (!user) {
            console.log('User not found in database');
            return null;
        }
        if (user.password === password) {
            console.log('Authentication successful for user:', email);
            return Promise.resolve({ email: email, password: password });
        } else {
            console.log('Incorrect password for user:', email);
            return null;
        }
    } else {
        console.log('Missing email or password');
        return null;
    }
}

// console.log("Configuring session store and authentication...");
export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;


