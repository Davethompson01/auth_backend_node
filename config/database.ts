import mysql from "mysql2/promise";
import dotenv from "dotenv";
import Utilis from "../assets/controller/utilis.ts";
const utils = new Utilis();


dotenv.config();

export default class Database {
  private static pool: mysql.Pool;

  public static async connect() {
    try {
      if (!Database.pool) {
        Database.pool = mysql.createPool({
          host: process.env.DB_HOST!,
          user: process.env.DB_USERNAME!,
          password: process.env.DB_PASSWORD!,
          database: process.env.DB_NAME!,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });

        // console.log("Created MySQL connection pool, testing connection...");

        const connection = await Database.pool.getConnection();
        await connection.query("SELECT 1");
        connection.release();

        // console.log(" Successfully connected to MySQL database");
      }


      return Database.pool;
    } catch (error: any) {
      console.error("Database connection failed:", error.message);
      //const utils = new Utilis();
      return error.message;
    }
  }
}

// Test the connection
Database.connect()
