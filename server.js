const http = require('http');
const getControllers = require('./controllers/register/register.controller');
const PORT = 3000



const server = http.createServer((req, res) => {
    // Set CORS headers
    // res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust * to your specific origin if needed
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { url, method } = req;
    const startPointUrl = "/api"


    if (url === `${startPointUrl}/register` && method === "POST") {
        getControllers.register(req, res)
    }


    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify({
    //     data: 'Hello World!',
    // }));
})



server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})