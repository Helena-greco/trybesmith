import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import statusCode from '../enum/statusCode';
import { ILogin } from '../interface/ILogin';
import Models from '../models/User';

dotEnv.config();

const valUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body as ILogin;
  if (!username) return res.status(statusCode.BAD_REQUEST).json({ error: 'Username is required' });
  next();
};

const valPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body as ILogin;
  if (!password) return res.status(statusCode.BAD_REQUEST).json({ error: 'Password is required' });
  next();
};

const validUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body as ILogin;
  if (username.length < 5) {
    return res.status(statusCode.UNAUTHORIZED).json({ error: 'Username or password invalid' });
  }
  next();
};

const validPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body as ILogin;
  if (password.length > 10) {
    return res.status(statusCode.UNAUTHORIZED).json({ error: 'Username or password invalid' });
  }
  next();
};

const secret = process.env.JWT_SECRET || 'secreto123';
type Token = { token: string }; 

const getLogin = async (login: ILogin): Promise<Token> => {
  const Login = await Models.getLogin(login);
  const token = jwt.sign(Login, secret);
  return { token };
};

export default {
  valUsername,
  valPassword,
  validUsername,
  validPassword,
  getLogin,
};