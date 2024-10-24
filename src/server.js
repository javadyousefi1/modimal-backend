const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { allRoutes } = require("./routes/router");
const SwaggerConfig = require("./config/swagger.config");
const cookieParser = require('cookie-parser');
const path = require('path');
const serveIndex = require("serve-index");
const http = require("http");
const { initializeSocket } = require("./socket/socketHandler"); // Import the socket initialization function
const https = require("https");
const redis = require('redis');
const sql = require('mssql');
dotenv.config();

class Application {
    #app = express();
    #server = http.createServer(this.#app);
    #PORT = process.env.PORT || 5000;
    #DB_URI = process.env.MONGO_DB_URL;
    #HTTPS_PORT = process.env.HTTPS_PORT || 443;
    #redisClient;
    constructor() {
        this.connectToDB();
        // this.connectToSQLServer();
        this.initClientSession();
        this.configServer();
        // initializeSocket(this.#server); // Initialize Socket.io with the HTTP server
        this.startServer();
    }

    startServer() {
        this.#server.listen(this.#PORT, () =>
            console.log(`Listening on port http://localhost:${this.#PORT}`)
        );
    }

    async connectToDB() {
        mongoose
            .connect(this.#DB_URI)
            .then(() => console.log("MongoDB connected!!"))
            .catch((err) => console.log("Failed to connect to MongoDB", err));

        const client = redis.createClient({
            url: process.env.REDIS_CONNECTION_STRING
        });

        // client.connect()
        //     .then(() => console.log('Connected to Redis'))
        //     .catch((err) => console.error('Redis connection error:', err));

        // this.#app.use((req, res, next) => {
        //     req.redis = client;
        //     next();
        // });

    }
    // SQL Server connection function
    async connectToSQLServer() {
        try {
            const sqlConfig = {
                user: "sa",
                password: "rrPgO2p5Obzx8BjdCqyMNyJL",
                server: "vinson.liara.cloud", // e.g., 'localhost' for local dev
                database: "myDB",
                port: 32400,
                options: {
                    encrypt: true, // Use true if you're on Azure
                    // trustServerCertificate: true // Needed for local dev if using self-signed certs
                }
            };

            await sql.connect(sqlConfig);
            console.log('Connected to SQL Server');
        } catch (err) {
            console.error('Failed to connect to SQL Server:', err);
        }
    }

    configServer() {
        this.#app.use(
            cors({ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN })
        );
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));

        const uploadsPath = path.join(__dirname, '../uploads');
        const fs = require('fs');
        if (fs.existsSync(uploadsPath)) {
            console.log("Uploads path exists.");
        } else {
            console.log("Uploads path does not exist.");
            fs.mkdirSync(uploadsPath, { recursive: true });
        }

        this.#app.use("/uploads", express.static(uploadsPath));
        this.#app.use('/uploads', serveIndex(uploadsPath, { icons: true }));

        SwaggerConfig(this.#app);
        this.configRoutes();
        this.errorHandling();
    }

    configRoutes() {
        this.#app.use("/api", allRoutes);
    }

    initClientSession() {
        this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("Not found route"));
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                statusCode,
                message,
            });
        });
    }
}

module.exports = Application;
