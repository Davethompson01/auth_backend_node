import pkg from "mysql2/promise";
import dotenv from "dotenv";
import Utilis from "../assets/controller/utilis.ts";

// dotenv.config();
dotenv.config({ path: "../../.env" });

// dotenv.config({ path: "../.env" });

const { createPool } = pkg;
const utils = new Utilis();

export default class Database {
  private static pool: any = null;

  public static async connect(): Promise<void> {
    try {
      if (Database.pool) {
        console.log("Database pool already initialized");
        return;
      }

      const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

      if (!DB_HOST || !DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
        throw new Error("Missing required database environment variables");
      }

      if (!Database.pool) {
        Database.pool = createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT) || 3306,
        });
        console.log(" Successfully connected to MySQL database");
      }
      return Database.pool;
      console.log("Successfully connected to MySQL database");
    } catch (error: any) {
      console.error("Database connection failed:", error.message);
      utils.returnData(false, "Database connection failed", error.message);
      throw error;
    }
  }

  // public static getPool() {
  //   if (!Database.pool) {
  //     throw new Error("Database pool not initialized. Call Database.connect() first.");
  //   }
  //   return Database.pool;
  // }

  // public static async close(): Promise<void> {
  //   if (Database.pool) {
  //     await Database.pool.end();
  //     Database.pool = null;
  //     console.log(" MySQL connection pool closed");
  //   }
  // }
}
