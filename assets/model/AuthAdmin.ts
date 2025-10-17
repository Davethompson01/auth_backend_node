
import utilis from '../controller/utilis.ts'
import SQL from './sql.ts'


export default class AuthAdmin {

    public utilis = new utilis();
    public sql = new SQL();

    public async adminsAccount(uniqueUserId: string, username: string, email: string, password: string, user_type: string) {
        const create = await this.sql.insert('admins', {
            username,
            email,
            password,
            token: uniqueUserId,
            user_type,
        });

        if (!create.success || create.data.row < 1) {
            return this.utilis.returnData(false, "Failed to create Admin", create);
        }

        return this.utilis.returnData(true, "Successfully created Admin", {
            id: create.data.insertId,
            username,
            email,
            user_type,
        });
    }

}