import { Request, Response } from 'express';
import statusCode from '../enum/statusCode';
import { IProduct } from '../interface/IProducts';
import Services from '../services/Products';

const create = async (req: Request, res: Response): Promise<Response> => {
  const product = req.body as IProduct;

  const createResult = await Services.create(product);

  return res.status(statusCode.CREATED).json(createResult);
};

const getAll = async (_req: Request, res: Response): Promise<Response> => {
  const allProducts = await Services.getAll();
  return res.status(statusCode.OK).json(allProducts);
};

export default {
  create,
  getAll,
};