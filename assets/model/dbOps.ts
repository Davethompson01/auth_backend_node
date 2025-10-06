


import sql from "./sql.ts";
import Database from "../../config/database.ts";
import Utilis from "../controller/utilis.ts";
import { log } from "console";


export default class DBops extends sql {


    // public async db_connect() {
    //     this.db_connection = await Database.connect();
    //     return this.db_connection;
    // }

    public async createUsersTable() {

        const results = await this.createTable(
            'users',
            `user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, username VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
        )

        console.log("I love you so much ", results);
        return await results
    }
}

(async () => {
    const result = await new DBops().createUsersTable();
    console.log('ffjfjfhfncnie', result);
})();

// console.log('ffjfjfhfncnie', await new DBops().createUsersTable());


const sqls = await new DBops()
sqls.dropDatabase('thompson_authorisation').then(console.log);