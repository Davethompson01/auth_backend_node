import { deepStrictEqual } from "assert";
import Database from "../../config/database.ts";
import Utilis from "../controller/utilis.ts";

const utils = new Utilis();


export default class SQL {
    protected db_connection: any;

    public async db_connect() {
        this.db_connection = await Database.connect();
        return this.db_connection;
    }


    private validateIdentifier(name: string) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        return regex.test(name);
    }

    private validateColumns(columns: string[]) {
        if (!Array.isArray(columns) || columns.length === 0)
            return utils.returnData(false, "No columns provided", []);

        for (const col of columns) {
            if (!this.validateIdentifier(col))
                return utils.returnData(false, `Invalid column name: ${col}`, col);
        }

        return utils.returnData(true, "Columns validated successfully", columns);
    }

    // CREATE TABLE
    public async createTable(tableName: string, schema: string) {
        if (!this.validateIdentifier(tableName))
            return utils.returnData(false, "Invalid table name", tableName);

        let sql = "";

        try {
            const db = await this.db_connect();
            sql = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${schema});`;
            await db.query(sql);

            return utils.returnData(true, `Table '${tableName}' created successfully`, sql);
        } catch (error: any) {
            return utils.returnData(false, `Error creating table: ${error.message}`, { sql, stack: error.stack });
        }
    }




    //INSERT
    public async insert(table: string, data: Record<string, any>) {
        if (!this.validateIdentifier(table))
            return utils.returnData(false, "Invalid table name", table);

        const columns = Object.keys(data);
        const check = this.validateColumns(columns);

        if (!check.success) {
            return check;
        }

        const values = Object.values(data);
        const placeholders = columns.map(() => "?").join(", ");
        const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`;

        try {
            const db = await this.db_connect();
            const [result] = await db.query(sql, values);
            return utils.returnData(true, "Insert successful", result);
        } catch (error: any) {
            return utils.returnData(false, `Insert failed: ${error.message}`, {});
        }
    }

    // SELECT
    public async select(
        table: string,
        columns: string[] = ["*"],
        condition?: string,
        params: any[] = []
    ) {
        if (!this.validateIdentifier(table)) {
            return utils.returnData(false, "Invalid table name", table);
        }

        const columnCheck = this.validateColumns(columns);
        if (!columnCheck.success) return columnCheck;


        let sql = `SELECT ${columns.join(", ")} FROM ${table}`;

        // Add condition if provided
        if (condition) {
            sql += ` WHERE ${condition}`;
        }

        try {
            const db = await this.db_connect();
            const [rows] = await db.query(sql, params);
            return utils.returnData(true, "Select successful", rows);
        } catch (error: any) {
            return utils.returnData(false, `Select failed: ${error.message}`, []);
        }
    }


    //  DELETE
    public async delete(table: string, condition: string) {
        if (!this.validateIdentifier(table))
            return utils.returnData(false, "Invalid table name", table);

        if (!condition)
            return utils.returnData(false, "Delete condition required", {});

        const sql = `DELETE FROM ${table} WHERE ${condition}`;

        try {
            const db = await this.db_connect();
            const [result] = await db.query(sql);
            return utils.returnData(true, "Delete successful", result);
        } catch (error: any) {
            return utils.returnData(false, `Delete failed: ${error.message}`, {});
        }
    }


    public async dropDatabase(dbName: string) {
        try {
            const db = await this.db_connect();
            await db.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
            return utils.returnData(true, `Database '${dbName}' dropped successfully`, {});
        } catch (error: any) {
            return utils.returnData(false, `Error dropping database: ${error.message}`, {});
        }
    }



    public async exists(
        table: string,
        condition: string,
        params: any[] = []
    ) {
        if (!this.validateIdentifier(table)) {
            return utils.returnData(false, "Invalid table name", table);
        }

        const sql = `SELECT EXISTS(SELECT 1 FROM ${table} WHERE ${condition}) AS found`;

        try {
            const db = await this.db_connect();
            const [rows]: any = await db.query(sql, params);


            const exists = rows[0].found === 1;
            return utils.returnData(true, "Check successful", exists);
        } catch (error: any) {
            return utils.returnData(false, `Exists check failed: ${error.message}`, false);
        }
    }

}
