import { TIngredient } from "./data";

export type TIngredientConstructor = TIngredient & { id: string };

export type TIngredientDescription = TIngredientConstructor & {
  qty: number;
};

export type TConstructorState = {
  bun: TIngredientConstructor | null | undefined;
  ingredients: TIngredientConstructor[];
};

export type TTabSwitch = "bun" | "sauce" | "main";
