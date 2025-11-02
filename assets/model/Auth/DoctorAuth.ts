




import db from './../../../config/database.ts'
import sql from './../sql.ts'
import Utilis from './../../controller/utilis.ts'

export default class {


    protected database: any

    public async db_connect() {
        this.database = await db.connect()
        return this.database
    }

    protected sql = new sql();

    protected utilis = new Utilis();

    public async createDoctor(DoctorName: string, userType: string, email: string, DoctorToken: string, password: string) {
        const insert = await this.sql.insert('doctors', {
            DoctorName,
            email,
            DoctorToken,
            password,
            userType
        });

        if (insert.success && insert.data.length > 0) {
            return this.utilis.returnData(true, "User created successfully", insert.data);
        }

        return this.utilis.returnData(false, "Failed to create user", insert);
    }


}