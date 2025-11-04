


// import sql from "./dbOPS.js";
import Database from "../../config/database.js";
import Utilis from "../controller/utilis.js";
import dbOPS from "./dbOPS.ts";



export default class sql extends dbOPS {


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

    async createMedicalRecords() {
        const results = await this.createTable(
            'medical_records',
            `
            medical_records_id INT AUTO_INCREMENT PRIMARY KEY,
            patient_id INT NOT NULL, 
            Surgical History VARCHAR(100),
            family_medical_history VARCHAR(100),
            allergies VARCHAR(100),
            Immunizations VARCHAR(100),
            habits VARCHAR(100),
            Medications VARCHAR(100),
            current_conditions VARCHAR(100),
            FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
            `
        )
    }

    async createPrescriptions() {
        const results = await this.createTable(
            'prescriptions',
            `prescriptions_id AUTO_INCREMENT NOT NULL PRIMARY KEY,
             medication_name VARCHAR(100)
             dosage VARCHAR(100) NOT NULL,
             patient_id INT,
             FOREIGN KEY patient_id REFERENCES patients(patient_id),
             doctor_id INT,
             FOREIGN KEY doctor_id REFERENCES doctor(doctor_id),
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
1

`
        )
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
