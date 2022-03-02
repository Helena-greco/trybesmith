import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import statusCode from '../enum/statusCode';
import { IUser } from '../interface/IUser';
import Models from '../models/User';

dotEnv.config();

const validateUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body as IUser;

  if (!username) return res.status(statusCode.BAD_REQUEST).json({ error: 'Username is required' });
  if (typeof username !== 'string') {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Username must be a string' });
  }
  if (username.length < 3) {
    return res.status(statusCode.UNPROCESSABLE)
      .json({ error: 'Username must be longer than 2 characters' });
  }
  next();
};

const validateClasse = (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body as IUser;
  if (!classe) return res.status(statusCode.BAD_REQUEST).json({ error: 'Classe is required' });
  if (typeof classe !== 'string') {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Classe must be a string' });
  }
  if (classe.length < 3) {
    return res.status(statusCode.UNPROCESSABLE)
      .json({ error: 'Classe must be longer than 2 characters' });
  }
  next();
};

// consulta ao repo da Juliana Braga quanto a primeira validação do level.

const validateLevel = (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body as IUser;
  if (typeof level === 'undefined') {
    return res.status(statusCode.BAD_REQUEST).json({ error: 'Level is required' });
  }
  if (typeof level !== 'number') {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Level must be a number' });
  }
  if (level <= 0) {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Level must be greater than 0' });
  }
  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body as IUser;
  if (!password) return res.status(statusCode.BAD_REQUEST).json({ error: 'Password is required' });
  if (typeof password !== 'string') {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Password must be a string' });
  }
  if (password.length <= 8) {
    return res.status(statusCode.UNPROCESSABLE)
      .json({ error: 'Password must be longer than 7 characters' });
  }
  next();
};

const secret = process.env.JWT_SECRET || 'secreto123';
type Token = { token: string };

const createUser = async (user: IUser): Promise<Token> => {
  const newUser = await Models.create(user);
  const token = jwt.sign(newUser, secret);
  return { token };
};

export default {
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
  createUser,
};