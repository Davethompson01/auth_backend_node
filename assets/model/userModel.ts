import utilis from '../controller/utilis.ts'
import sql from './sql.ts'


export default class userModel{

    protected sql = new sql()
    protected utilis = new utilis()


    public async getMail(_email: string) {
        //check check mail
        let checkMail = [_email]
        let condition = 'email = ?'

        // sql query
        let sql = await this.sql.exists('users', condition, checkMail)
        // return sql
        if (sql.data === 1) {
            return this.utilis.returnData(true, "Email already exists", []);
        } else {
            return this.utilis.returnData(true, "No record found", sql);
        }
    }


    public async getUserByMail(email : string){
        let select = await this.sql.select(
            "users",
            ['user_id', 'username', 'password' , 'email'],
            "email = ?",
            [email]
        )
        if(!select.success){
            return this.utilis.returnData(false, "Selecting from db Failed", select)
        }else{
            return this.utilis.returnData(true, `Select from ${email} successful`, select)
        }
    }


}