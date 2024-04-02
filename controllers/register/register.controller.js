const getModels = require("../../models/register/register.model");

async function register(req, res) {
    try {
        const requiredKeys = ["firstname", "lastname", "email", "password"];

        // check all fields available :

        // get data and fill it in registerData
        let registerData = "";
        req.on("data", (chunk) => {
            registerData += chunk.toString();
        });

        req.on("end", async () => {
            console.log(registerData)
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

            // Validations
            const { firstname, lastname, email, password } = parsedJson;
            const trimmedFirstName = String(firstname).trim();
            const trimmedLastName = String(lastname).trim();
            const trimmedEmail = String(email).trim();
            const trimmedPassword = String(password).trim();

            if (
                !(trimmedFirstName.length >= 3 &&
                    trimmedLastName.length >= 3 &&
                    /^\S+@\S+\.\S+$/.test(trimmedEmail) &&
                    trimmedPassword.length >= 6)
            ) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Invalid data format!',
                }));
                return; // End the function execution here
            }


            const insertResult = await getModels.register(parsedJson)

            if (insertResult.isSuccess) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "register succesfully", userData: parsedJson, isSuccess: true }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(insertResult));
            }
        });

    } catch (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Internal Server Error',
        }));
    }
}

async function getUsers(req, res) {
    try {
        const users = await getModels.getUsers()
        console.log("users", users)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "register succesfully", userData: users, isSuccess: true }));
    } catch (err) {
        console.log(err);
    }
}

const getControllers = {
    register, getUsers
}

module.exports = getControllers;
