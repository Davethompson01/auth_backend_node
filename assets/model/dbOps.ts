


import sql from "./sql.ts";
import Database from "../../config/database.ts";
import Utilis from "../controller/utilis.ts";



export default class DBops extends sql {


    // public async db_connect() {
    //     this.db_connection = await Database.connect();
    //     return this.db_connection;
    // }

    public async createUsersTable() {

        const results = await this.createTable(
            'users',
            `user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, user_toke VARCHAR(100) UNIQUE, username VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
        )

        // console.log("I love you so much ", results);
        return await results
    }
}

(async () => {
    const result = await new DBops().createUsersTable();
    
})();
