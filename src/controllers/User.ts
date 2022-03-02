import { Request, Response } from 'express';
import statusCode from '../enum/statusCode';
import { IUser } from '../interface/IUser';
import Services from '../services/User';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.body as IUser;

  const createResult = await Services.createUser(user);

  return res.status(statusCode.CREATED).json(createResult);
};

export default {
  createUser,
};