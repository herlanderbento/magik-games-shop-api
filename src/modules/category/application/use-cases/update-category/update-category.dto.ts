import { CategoryOutputProps } from "../../common";

export type UpdateCategoryInput = {
  categoryId: string;
  name: string;
  description?: string;
};

export type UpdateCategoryOutput = CategoryOutputProps;
