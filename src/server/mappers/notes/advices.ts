import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetHelpCategoriesApiResponseData,
  type GetHelpCategoriesResponseData,
  type GetHelpCategoryApiResponseData,
  type GetHelpCategoryByIdApiResponseData,
  type GetHelpCategoryByIdResponseData,
  type GetHelpCategoryResponseData,
  type GetHelpMaterialResponseData,
} from "@/shared/types";

export const mapGetHelpCategoryResponse = (
  data: GetHelpCategoryApiResponseData,
): GetHelpCategoryResponseData => {
  return {
    id: data.id,
    title: data.title,
  };
};

export const mapGetHelpCategoriesResponse = (
  data: GetHelpCategoriesApiResponseData,
): GetHelpCategoriesResponseData => {
  return data.map(mapGetHelpCategoryResponse);
};

export const mapGetHelpCategoryByIdResponse = (
  data: GetHelpCategoryByIdApiResponseData,
): GetHelpCategoryByIdResponseData => {
  return {
    id: data.id,
    title: data.title,
    materials: data.materials.map(
      (material): GetHelpMaterialResponseData => ({
        type: material.type,
        materialId: material.material_id,
        title: material.title,
        imageUrl: `${SEVER_API_URL}${material.image_url}`,
      }),
    ),
  };
};
