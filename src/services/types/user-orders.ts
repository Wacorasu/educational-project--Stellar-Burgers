import { TError } from "./data";
import { TOnlyOrderInfo, TOrderInfo } from "./order-detail";

export type TOrderInfoWS = {
  total: number;
  totalToday: number;
  orders: Array<TOnlyOrderInfo>;
};

export type TUserOrdersState = {
  isLoadingSingleOrders: boolean;
  statusUserOrders: "disconnect" | "connecting" | "connect";
  statusAllOrders: "disconnect" | "connecting" | "connect";
  userOrdersData: Array<TOnlyOrderInfo>;
  allOrdersData: Array<TOnlyOrderInfo>;
  singleOrder: TOrderInfo | null;
  total: number | null;
  totalToday: number | null;
  errorUserOrders: string;
  errorAllOrders: string;
  errorsSingleOrders: TError;
};

export type TWsActions<C = {}, O = {}, Cl = {}, E = {}> = {
  wsConnecting: C;
  onOpen: O;
  onClose: Cl;
  onError: E;
};

export type TWsStaticActions<C = {}, D = {}, M = {}> = {
  wsConnect: C;
  wsDisconnect: D;
  onMessage: M;
};
