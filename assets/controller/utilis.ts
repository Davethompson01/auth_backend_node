

import argon2 from 'argon2';
import { memoryUsage } from 'process';



export default class utilis {


    public returnData(success: boolean, message: string, data: any) {
        return {
            success,
            message,
            data
        }

    }


    // generate random alphanumeric`
    public generateAlphaNumeric(length: number = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let results = '';

        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            results += chars[index];
        }

        return this.returnData(true, "Generated alphanumeric successfully", results);
    }



    // get OTP
    public getOTP() {
        return Math.floor(Math.random() * 999999).toString()
    }


    // pashsword hash
    public async passwordHash(password: string) {
        return await argon2.hash(password, {
            type: argon2.argon2id,
            memoryUsage: 2 ** 16,
            hashLength: 50,
            timeCost: 5,
            parallelism: 1
        })

    }

    // password verify
    public async passwordVerify(passwordHash: string, inputPassword: string) {
        if (!await argon2.verify(passwordHash, inputPassword)) {
            return false
        }
        return true
    }


    public requireData(...args: any[]) {
        // If no arguments were passed
        if (args.length === 0) {
            return this.returnData(false, "No data provided", []);
        }

        // Loop through all arguments
        for (const [index, value] of args.entries()) {
            if (
                value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")
            ) {
                return this.returnData(false, `Field ${index + 1} is required`, args);
            }
        }

        // return success if all fields are valid
        return this.returnData(true, "All fields are valid", args);
    }





}

// console.log(new utilis().getOTP());