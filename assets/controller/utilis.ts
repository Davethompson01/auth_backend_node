
export default class utilis {


    // generate random alphanumeric
    public generateAlphaNumeric() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let results = ''

        const length = Math.floor(Math.random() * 6) + 1
        for (let i = 0; i < length; i++) {
            let resultLoop = Math.floor(Math.random() * chars.length)
            results += chars[resultLoop]
        }
        return this.returnData(true, "Genrated generateAlphaNumeric Successfully", results);
    }

    public returnData(success: boolean, message: string, data: any) {

        return {
            success: true,
            message: message,
            data: data
        }


    }


    // get OTP
    public getOTP() {
        return Math.floor(Math.random() * 999999).toString()
    }

    


}

console.log(new utilis().getOTP());