import Database from '../../../config/database.js';
import Utilis from '../../controller/utilis.js';
import sql from '../sql.js'


export default class userAuth {


    protected db_connection: any;

    public async db_connect() {
        this.db_connection = await Database.connect();
        return this.db_connection;
    }

    protected sql = new sql();

    protected utilis = new Utilis();


    public getUserToken() {

    }

    public async createUser(username: string, email: string, password: string, token: string, userType: string) {

        // insert into database
        const insert = await this.sql.insert('users', {
            username, email, password, token, userType
        })

        if (insert.success && insert.data.rowcount > 0) {
            return this.utilis.returnData(true, "User created successfully", insert);
        }

        return this.utilis.returnData(false, "Failed to create user", insert);
    }

}

