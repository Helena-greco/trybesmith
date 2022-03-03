import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IProduct, IdProduct, Product } from '../interface/IProducts';

const create = async (product: IProduct): Promise<Product> => {
  const { name, amount } = product;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)', 
    [name, amount],
  );
  const { insertId: id } = result;

  const createdProduct: IdProduct = { id, name, amount };

  return { item: createdProduct };
};

export default {
  create,
};