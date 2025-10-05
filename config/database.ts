import mysw from 'mysql2/promise'
import dotenv from "dotenv"

dotenv.config()

let connected = ''
// connection pool
export const db = (connected) => mysql.createpool({
    try {
        if(connected){
            host: process.env.DB_HOST,
    name: process.env DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME

    

        }
    } catch(error){

    }
    return connected
})


