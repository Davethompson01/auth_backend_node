import mysql from "mysql2/promise";
import dotenv from "dotenv";
import Utilis from "../assets/controller/utilis.ts";

const utils = new Utilis();

dotenv.config();

export default class Database {
  private static pool: mysql.Pool | null = null;

  public static async connect(): Promise<mysql.Pool> {
    try {
      if (!Database.pool) {
        const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

        if (!DB_HOST || !DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
          throw new Error("Missing database variables");
        }

        Database.pool = mysql.createPool({
          host: DB_HOST,
          user: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_NAME,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });

        // Test the connection
        const connection = await Database.pool.getConnection();
        await connection.query("SELECT 1");
        connection.release();

        console.log("Successfully connected to MySQL database");
      }

      return Database.pool;
    } catch (error: any) {
      console.error(" Database connection failed:", error.message);
      utils.returnData(false, "Database connection failed", error.message);
      throw error;
    }
  }
}
