import { Request, Response } from 'express';
import statusCode from '../enum/statusCode';
import { IProduct } from '../interface/IProducts';
import Services from '../services/Products';

const create = async (req: Request, res: Response): Promise<Response> => {
  const product = req.body as IProduct;

  const createResult = await Services.create(product);

  return res.status(statusCode.CREATED).json(createResult);
};

export default {
  create,
};