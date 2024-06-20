import { CategoryOutputProps } from "../../common";

export type CreateCategoryInput = {
  name: string;
  description?: string;
};

export type CreateCategoryOutput = CategoryOutputProps