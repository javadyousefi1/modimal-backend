const http = require('http');
const getControllers = require('./controllers/register/register.controller');
const PORT = 3000

const server = http.createServer((req, res) => {

    const { url } = req;
    const startPointUrl = "/api"


    if (url === `${startPointUrl}/register`) {
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