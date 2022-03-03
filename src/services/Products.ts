import jwt, { Secret } from 'jsonwebtoken';
import dotEnv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import statusCode from '../enum/statusCode';
import { IProduct, Product, Token } from '../interface/IProducts';
import Models from '../models/Products';
import UserModels from '../models/User';

dotEnv.config();

const secret: Secret = process.env.JWT_SECRET || 'secreto123';

const decoding = (token: string) => {
  const decode: jwt.JwtPayload | string = jwt.verify(token, secret);
  return decode;
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: 'Token not found' });

  try {
    const { id }: Token = decoding(token) as Token;

    const userId = await UserModels.getById(id);

    if (!userId) {
      return res.status(statusCode.UNAUTHORIZED).json({ error: 'Invalid token' });
    }

    next();
  } catch (err) {
    return res.status(statusCode.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

const validateName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) return res.status(statusCode.BAD_REQUEST).json({ error: 'Name is required' });
  if (typeof name !== 'string') {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Name must be a string' });
  }
  if (name.length < 2) {
    return res.status(statusCode.UNPROCESSABLE).json({ 
      error: 'Name must be longer than 2 characters',
    });
  }
  next();
};

const validateAmount = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  if (!amount) return res.status(statusCode.BAD_REQUEST).json({ error: 'Amount is required' });
  if (typeof amount !== 'string') {
    return res.status(statusCode.UNPROCESSABLE).json({ error: 'Amount must be a string' });
  }
  if (amount.length < 2) {
    return res.status(statusCode.UNPROCESSABLE).json({ 
      error: 'Amount must be longer than 2 characters',
    });
  }
  next();
};

const create = async (product: IProduct): Promise<Product> => {
  const newProduct = await Models.create(product);
  return newProduct;
};

export default {
  validateToken,
  validateName,
  validateAmount,
  create,
};