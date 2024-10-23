// socket.js
const http = require('http');
const { Server } = require('socket.io');

// Create and export the Socket.io instance
let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.ALLOW_CORS_ORIGIN,
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
  
        // console.log(`User Connected: ${socket.id}`);

        socket.on("disconnect", () => {
            // console.log(`User Disconnected: ${socket.id}`);
        });

        // Additional event listeners can be added here
    });
}

function getSocket() {
    if (!io) {
        throw new Error("Socket.io is not initialized");
    }
    return io;
}

module.exports = { initializeSocket, getSocket };
