import { MongoClient } from "mongodb";

const connString = process.env.CONN_STRING;
const client = new MongoClient(connString);

let conn;
try {
  conn = await client.connect();
} catch {
  console.error(e);
}

let db = conn.db("blog_db");

export default db;
