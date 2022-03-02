import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IUser, UserId } from '../interface/IUser';

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

export default {
  create,
};