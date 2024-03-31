const { MongoClient, ObjectId } = require('mongodb')
const DB_URL = "mongodb://root:hVhwkuRqQuHVp3oEtb06tqgM@kamet.liara.cloud:33164/my-app?authSource=admin&replicaSet=rs0&directConnection=true"
const DB_Name = "mongodb-course"
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


const getModels = {
    register
}

module.exports = getModels