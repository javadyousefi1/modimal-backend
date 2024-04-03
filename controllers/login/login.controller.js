const getModels = require("../../models/register/register.model");

async function login(req, res) {
    try {
        const requiredKeys = ["email", "password"];

        // check all fields available :

        // get data and fill it in loginData
        let loginData = "";
        req.on("data", (chunk) => {
            loginData += chunk.toString();
        });

        req.on("end", async () => {
            const parsedJson = JSON.parse(registerData);

            function lowercaseKeys(obj) {
                return Object.keys(obj).reduce((accumulator, key) => {
                    accumulator[key.toLowerCase()] = obj[key];
                    return accumulator;
                }, {});
            }

            const lowerCaseObj = lowercaseKeys(parsedJson)

            const jsonKeys = Object.keys(lowerCaseObj);

            const hasAllRequiredKeys = requiredKeys.every(key => jsonKeys.includes(key.toLowerCase()));

            if (!hasAllRequiredKeys) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'send all needed data !',
                }));
                return; // End the function execution here
            }

            // Validations
            const { email, password } = parsedJson;
            const trimmedEmail = String(email).trim();
            const trimmedPassword = String(password).trim();

            if (
                !(
                    /^\S+@\S+\.\S+$/.test(trimmedEmail) &&
                    trimmedPassword.length >= 6)
            ) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Invalid data format!',
                }));
                return; // End the function execution here
            }


            const userData = await getModels.getUsersByEmail(trimmedEmail)

            if (userData) {

                if (userData.email === trimmedEmail && userData.password === trimmedPassword) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "user login successfully", isSuccess: true }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "password is wrong", isSuccess: false }));
                }


            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "this email does not exist on modimal", isSuccess: false }));
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


const getLoginController = { login }

module.exports = getLoginController