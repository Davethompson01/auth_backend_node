


import sql from "./dbOPS.js";
import Database from "../../config/database.js";
import Utilis from "../controller/utilis.js";



export default class DBops extends sql {


    // public async db_connect() {
    //     this.db_connection = await Database.connect();
    //     return this.db_connection;
    // }

    public async createPatientTable() {
        const results = await this.createTable(
            'patients',
            `patient_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
            patient_token VARCHAR(100) UNIQUE,
            user_type VARCHAR(100) NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            JWT_token VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            maritial_status VARCHAR(100) ,
            blood_type VARCHAR(100),
            emergency_contact varchar(100)
            `
        );
        return results;
    }

    public async createDoctorTable() {


        const createAdmin = await this.createTable(
            'admin',
            `admin_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            usertype VARCHAR(100) NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL,
            user_token VARCHAR(100) NOT NULL,
            JWT_token VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
        );
        return createAdmin;
    }
}


(async () => {
    try {
        const ops = new DBops();
        const result = await ops.createAdminTable();
        console.log(" Admin table created:", result);
    } catch (error) {
        console.error(" Failed to create table:", error);
    } finally {
        process.exit();
    }
})();
