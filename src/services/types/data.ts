export type TIngredientServer = {
  readonly _id: string;
  readonly name: string;
  readonly type: "bun" | "sauce" | "main";
  readonly proteins: number;
  readonly fat: number;
  readonly calories : number;
  readonly carbohydrates: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredient = TIngredientServer & {
  count: number;
};

export type TServerRequest = {
  success: boolean;
};

export type TUserData = TServerRequest & {
  readonly user: {
    readonly name: string;
    readonly email: string;
  };
};

export type TMessageError = TServerRequest & {
  message: string;
};

export type TError = {
  hasError: boolean;
  message: string;
};

export type TServersTokens = TServerRequest & {
  accessToken?: string;
  refreshToken?: string;
};
