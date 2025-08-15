import { IUserAddress } from "../../modules/Customer/pages/Account/types";
import { ICart, IUser } from "../../types";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IToastType {
  message: string | null;
  type: string | null;
}

export interface AuthInterface {
  token?: string | null;
  isAuthenticated?: boolean;
  userData?: IUser | null;
}

export interface SearchInterface {
  query: string | null;
}

export interface CartInterface {
  cartData: ICart[];
  totalPrice: number;
}

export interface AddressInterface {
  addresses: IUserAddress[];
}
