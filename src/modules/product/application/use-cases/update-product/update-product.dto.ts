import { ProductOutput } from "../../common";

export type UpdateProductInput = {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  price: number;
};

export type UpdateProductOutput = ProductOutput;