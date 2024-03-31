async function register(req, res) {
    try {
        const requiredKeys = ["firstname", "lastname", "email", "password"];

        // check all fields available :

        // get data and fill it in registerData
        let registerData = "";
        req.on("data", (chunk) => {
            registerData += chunk;
        });

        req.on("end", async () => {
            const parsedJson = JSON.parse(registerData);
            const jsonKeys = Object.keys(parsedJson);
            const hasAllRequiredKeys = requiredKeys.every(key => jsonKeys.includes(key.toLowerCase()));

            if (!hasAllRequiredKeys) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'send all needed data !',
                }));
                return; // End the function execution here
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'it is ok',
            }));

        });

    } catch (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Internal Server Error',
        }));
    }
}

const getControllers = {
    register
}

module.exports = getControllers;
