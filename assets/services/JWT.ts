import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import utilis from '../controller/utilis.ts'

dotenv.config()

export default class JWT {

    public utilis = new utilis()
  private SECRET_KEY: string

  constructor() {
    const secret = process.env.SECRET_KEY
    if (!secret) {
      throw new Error("SECRET_KEY is not defined in .env")
    }
    this.SECRET_KEY = secret
  }

  public async generateToken(payload: Record<string, any>): Promise<string> {
    // Convert to seconds
    const issuedAt = Math.floor(Date.now() / 1000)
    const expiresIn = issuedAt + 60 * 60 // 1 hour expiry

    const tokenPayload = {
      
      ...payload,
      iat: issuedAt,
      exp: expiresIn
    }

    const token = jwt.sign(tokenPayload, this.SECRET_KEY)
    return token
  }

  public async verifyToken(token: string){
    try {
      const decoded =  jwt.verify(token, this.SECRET_KEY)
      return this.utilis.returnData(true,'Successfully decoded', decoded)
    } catch (err: any) {
        this.utilis.returnData(false,'error while decoded', err.decoded)
    //   return { success: false, message: err.message }
    }
  }


  
}
