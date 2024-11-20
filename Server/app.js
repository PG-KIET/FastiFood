import "dotenv/config";
import express from "express";
import AdminJSExpress from "@adminjs/express";  
import http from "http";        
import { connectDB } from './src/config/connect.js';
import { PORT } from "./src/config/config.js";
import { admin } from "./src/config/setup.js";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./src/config/config.js";
import { registerRoutes } from "./src/routes/index.js";
import { Server } from "socket.io";  // Thay đổi ở đây

const start = async () => {
    // Kết nối tới cơ sở dữ liệu MongoDB
    await connectDB(process.env.MONGO_URI);

    // Khởi tạo ứng dụng Express
    const app = express();  
    
    // Cấu hình AdminJS router
    const adminRouter = await AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'sessionsecret',
        },
        null,
        {
          store: sessionStore,
          resave: true,
          saveUninitialized: true,
          secret: 'sessionsecret',
          cookie: {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
          },
          name: 'adminjs',
        }
      )


    app.use(admin.options.rootPath, adminRouter)
    app.use(express.json());  // Middleware cho JSON
    app.use(express.urlencoded({ extended: true }));  // Middleware cho URL-encoded dữ liệu


    

    // Tạo server HTTP từ ứng dụng Express
    const server = http.createServer(app);  
    
    // console.log(server)
    // Khởi tạo socket.io với server
    const io = new Server(server, {          
        cors: {
            origin: "*",  // Cho phép tất cả nguồn gốc
        },
        pingInterval: 10000,  // Thời gian ping
        pingTimeout: 5000,    // Thời gian timeout ping
        transports: ["websocket"],  // Dùng WebSocket làm phương thức truyền tải
    });
    app.io = io;
    // Đăng ký các route ứng dụng
    await registerRoutes(app);

    // Lắng nghe sự kiện socket
    io.on("connection", (socket) => {
        console.log("A User Connected");

        // Người dùng tham gia phòng chat (room)
        socket.on("joinRoom", (orderId) => {
            socket.join(orderId);  // Tham gia phòng theo orderId
            console.log(`User Joined Room: ${orderId}`);
        });

        // Khi người dùng ngắt kết nối
        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });
    });

    // Chạy server
    server.listen(PORT, '0.0.0.0', (err, addr) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`FastiFood Started on http://localhost:${PORT}${admin.options.rootPath}`);
        }
    });

      
}

start().catch((error) => {
    console.error("Error during startup:", error);
  });

