export type Entities<T extends { id: string }> = {
  [id: string]: T;
};
