
import db from './../../../config/database.ts'
import sql from '../dbOPS.js'
import Utilis from './../../controller/utilis.ts'
import userModel from '../userModel.ts'

export default class {


    protected database: any

    public async db_connect() {
        this.database = await db.connect()
        return this.database
    }

    protected sql = new sql();

    protected utilis = new Utilis();

    public async createPatient(patientName: string, userType: string, email: string, patientToken: string, password: string) {
        const insert = await this.sql.insert('patients', {
            patientName,
            email,
            patientToken,
            password,
            userType
        });

        if (insert.success && insert.data.length > 0) {
            return this.utilis.returnData(true, "User created successfully", insert.data);
        }

        return this.utilis.returnData(false, "Failed to create user", insert);
    }

    async loginPatient(email: string, password: string) {


    }



}