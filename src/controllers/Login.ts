import { Request, Response } from 'express';
import statusCode from '../enum/statusCode';
import { ILogin } from '../interface/ILogin';
import Services from '../services/Login';

const getLogin = async (req: Request, res: Response): Promise<Response> => {
  const login = req.body as ILogin;

  const createResult = await Services.getLogin(login);

  return res.status(statusCode.OK).json(createResult);
};

export default {
  getLogin,
};