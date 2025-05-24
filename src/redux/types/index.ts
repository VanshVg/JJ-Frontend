import { IUser } from "../../types";
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
