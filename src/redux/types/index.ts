import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IToastType {
  message: string | null;
  type: string | null;
}
