import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

/** Ref: https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/ */

const secret: Secret = process.env.JWT_SECRET || 'secreto123';

const generateToken = (id: number, username: string) => {
  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const data: JwtPayload = { id, username };
  const token: string = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

export default {
  generateToken,
};