export interface RecipeDataSource {
  create: () => any;
  getOne: () => any;
  getAll: () => any;
  update: () => any;
  addLike: () => any;
  removeLike: () => any;
}
