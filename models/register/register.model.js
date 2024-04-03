const { MongoClient, ObjectId } = require('mongodb')
const DB_URL = "mongodb://admin:xHFrwVqZyiwkn4THS93f@remote-asiatech.runflare.com:32515/admin"
const DB_Name = "modimal"
const client = new MongoClient(DB_URL)


async function register(newUserData) {
    try {
        await client.connect()
        const db = client.db(DB_Name)
        const userCollection = db.collection("users")

        // check this email avalible from past or not
        const emaiAvalibleCount = await userCollection.countDocuments({ email: newUserData.email })

        if (emaiAvalibleCount !== 0) {
            return { message: "this email already exsits", isSuccess: false }
        }

        const insertResult = await userCollection.insertOne(newUserData)
        client.close();
        return new Promise((resolve, reject) => {
            if (insertResult.insertedId) {
                resolve({ message: "inserted successfully", userId: insertResult, isSuccess: true })
            } else {
                reject({ message: "insert failed", isSuccess: false })
            }
        })
    } catch (err) {
        console.error(err)
    }
}

async function getUsers() {
    try {
        await client.connect()
        const db = client.db(DB_Name)
        const userCollection = db.collection("users")
        const usersList = (await userCollection.find({}).toArray()).map(item => {
            delete item.password
            return item
        });

        return new Promise((resolve, reject) => {
            if (usersList) {
                resolve(usersList)
            } else {
                reject({ message: "failed to get users from db", isSuccess: false })
            }
        })

    } catch (err) {
        console.log(err)
    }
}

async function getUsersById(id) {
    try {
        await client.connect()
        const db = client.db(DB_Name)
        const userCollection = db.collection("users")
        const foundedUser = userCollection.findOne({ _id: new ObjectId(id) })

        return new Promise((resolve, reject) => {
            if (foundedUser) {
                resolve(foundedUser)
            } else {
                reject({ message: "failed to get users from db", isSuccess: false })
            }
        })

    } catch (err) {
        console.log(err)
    }
}

async function getUsersByEmail(email) {
    try {
        await client.connect()
        const db = client.db(DB_Name)
        const userCollection = db.collection("users")
        const foundedUser = userCollection.findOne({ email: email })

        return new Promise((resolve, reject) => {
            if (foundedUser) {
                resolve(foundedUser)
            } else {
                reject({ message: "failed to get users by email from db", isSuccess: false })
            }
        })

    } catch (err) {
        console.log(err)
    }
}



const getModels = {
    register, getUsers, getUsersById, getUsersByEmail
}

module.exports = getModels