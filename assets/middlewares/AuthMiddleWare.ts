import { Request, Response, NextFunction } from 'express';
import JWTService from '../services/JWT.ts';
import Utilis from '../controller/utilis.ts';

const jwtService = new JWTService();
const utilis = new Utilis();

export default async function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return utilis.sendResponse(res, 401, false, 'Authorization header missing', null);
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return utilis.sendResponse(res, 401, false, 'Invalid Authorization format', null);
    }

    const token = parts[1];
    if (!token) {
      return utilis.sendResponse(res, 401, false, 'Token missing', null);
    }

    const verified = await jwtService.verifyToken(token);

    if (!verified.success) {
      return utilis.sendResponse(res, 401, false, verified.message, null);
    }

    (req as any).user = verified.data;
    next();
  } catch (error: any) {
    return utilis.sendResponse(res, 500, false, 'Internal server error', error.message);
  }
}
