export type GetHelpCategoryApiResponseData = {
  id: string;
  title: string;
};

export type GetHelpCategoriesApiResponseData = GetHelpCategoryApiResponseData[];

export type GetHelpMaterialApiResponseData = {
  type: string;
  material_id: string;
};

export type GetHelpCategoryByIdApiResponseData = {
  id: string;
  title: string;
  materials: GetHelpMaterialApiResponseData[];
};

export type GetHelpCategoryResponseData = {
  id: string;
  title: string;
};

export type GetHelpCategoriesResponseData = GetHelpCategoryResponseData[];

export type GetHelpMaterialResponseData = {
  type: string;
  materialId: string;
};

export type GetHelpCategoryByIdResponseData = {
  id: string;
  title: string;
  materials: GetHelpMaterialResponseData[];
};
