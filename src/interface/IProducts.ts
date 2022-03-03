/** Ref: https://docs.microsoft.com/en-us/dotnet/api/system.identitymodel.tokens.jwt.jwtpayload?view=azure-dotnet */
import { JwtPayload } from 'jsonwebtoken';

export interface IProduct {
  name: string;
  amount: string;
}

export interface IdProduct extends IProduct {
  id: number;
}

export interface ProductOrder extends IdProduct {
  orderId: number | null,
}

export interface Product {
  item: IdProduct,
}

export interface Token extends JwtPayload {
  data: {
    id: number,
    username: string,
  }
}
