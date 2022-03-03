import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IProduct, IdProduct, Product, ProductOrder } from '../interface/IProducts';

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

const getAll = async (): Promise<ProductOrder[]> => {
  const [data] = await connection.execute('SELECT * FROM Trybesmith.Products');
  return data as ProductOrder[];
};

export default {
  create,
  getAll,
};