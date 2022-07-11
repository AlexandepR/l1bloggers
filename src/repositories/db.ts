import {MongoClient} from 'mongodb'

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoUri);

export async function runDb() {
        try {
            await client.connect();
            await client.db("bloggers").command({ ping: 1});
        } catch {
            console.log("Can't connect to db")
            await client.close();
        }
}