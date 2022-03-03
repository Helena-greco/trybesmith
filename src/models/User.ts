import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IUser, UserId } from '../interface/IUser';
import { ILogin } from '../interface/ILogin';

const create = async (user: IUser): Promise<UserId> => {
  const { username, classe, level, password } = user;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const createdUser: UserId = { id, username, classe, level, password };

  return createdUser;
};

/** Ref: https://github.com/tryber/sd-014-typescript-crud-mysql/blob/master/models/User.ts 
 * ajuda do github fornecido pelos instrutores sobre o retorno do select.
 */
const getLogin = async (login: ILogin): Promise<ILogin> => {
  const { username, password } = login;
  const [result] = await connection.execute(
    'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
    [username, password],
  );
  const [row] = result as ILogin[];
  return row;
};

export default {
  create,
  getLogin,
};