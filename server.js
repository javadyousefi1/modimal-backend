const http = require('http');
const getControllers = require('./controllers/register/register.controller');
const getLoginController = require('./controllers/login/login.controller');
const PORT = 3000



const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust * to your specific origin if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    const { url, method } = req;
    const startPointUrl = "/api"


    if (url === `${startPointUrl}/register` && method === "POST") {
        getControllers.register(req, res)
    } else if (url === `${startPointUrl}/login` && method === "POST") {
        getLoginController.login(req, res)
    } else if (url === `${startPointUrl}/users` && method === "GET") {
        getControllers.getUsers(req, res)
    } else if (url.match(/\/api\/users\/[0-9]+/) && method === "GET") {
        getControllers.getUsersById(req, res)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'route not found',
        }));
    }
})



server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})