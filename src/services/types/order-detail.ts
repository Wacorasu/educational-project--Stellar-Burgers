
export type TOnlyOrderInfo={
    number: string;
    ingredients: Array<string>;
    _id: string;
    owner?: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    price: number;
}

export type TOrderInfo = {
  name?: string;
  status?: string;
  order: TOnlyOrderInfo
};

export type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  data: TOrderInfo | null | undefined;
};
