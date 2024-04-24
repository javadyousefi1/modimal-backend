// const http = require('http');
// const getControllers = require('./controllers/register/register.controller');
// const getLoginController = require('./controllers/login/login.controller');
// const PORT = 3000

// const server = http.createServer((req, res) => {
//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', 'https://javadyousefi.com/*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.writeHead(200);
//         res.end();
//         return;
//     }

//     const { url, method } = req;
//     const startPointUrl = "/api"

//     if (url === `${startPointUrl}/register` && method === "POST") {
//         getControllers.register(req, res)
//     } else if (url === `${startPointUrl}/login` && method === "POST") {
//         getLoginController.login(req, res)
//     } else if (url === `${startPointUrl}/users` && method === "GET") {
//         getControllers.getUsers(req, res)
//     } else if (url.match(/\/api\/users\/[0-9]+/) && method === "GET") {
//         getControllers.getUsersById(req, res)
//     }
//     else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({
//             message: 'route not found',
//         }));
//     }
// })

// server.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`)
// })

const express = require("express");
const app = express();

app.use(express.json());

// app.use((req, res) => {
//   res.status(404).json({
//     statusCode: res.statusCode,
//     message: "route not found",
//   });
// });

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ statusCode: res.statusCode, message: "welcome to modimal" });
});

app.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  

  res
    .status(200)
    .json({ statusCode: res.statusCode, message: "welcome to modimal" });
});

app.use((err, req, res, next) => {
  res.json({
    statusCode: err.status || 500,
    message: err.message || "server internal error",
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
