import { NextResponse } from "next/server";
import { mapGetArticleResponse, mapReadArticleRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetArticleApiResponseData,
  type GetArticleProgressApiResponseData,
  type GetArticleResponseData,
  type ReadArticleApiRequestData,
  ResponseSuccessInfo,
} from "@/shared/types";

const getArticle = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getArticlePromise = serverFetch.get<GetArticleApiResponseData>(
      `/education/themes/${id}/materials/list`,
    );

    const getArticleProgressPromise =
      serverFetch.get<GetArticleProgressApiResponseData>(`/education/progress`);

    const [articleResponse, articleProgressResponse] = await Promise.all([
      getArticlePromise,
      getArticleProgressPromise,
    ]);

    const data: GetArticleResponseData = mapGetArticleResponse(
      articleResponse.data,
      articleProgressResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

const readArticle = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const articleResponse = await serverFetch.get<GetArticleApiResponseData>(
      `/education/themes/${id}/materials/list`,
    );

    const promises = [];

    for (const material of articleResponse.data.education_materials) {
      const readMaterialPromise = serverFetch.post<
        any,
        ReadArticleApiRequestData
      >(`/education/materials/complete`, mapReadArticleRequest(material.id));

      promises.push(readMaterialPromise);
    }

    await Promise.all(promises);

    return NextResponse.json(
      new ResponseSuccessInfo("Article successful read"),
      httpStatuses.ok,
    );
  },
);

export const ArticleRoutes = {
  GET: getArticle,
  POST: readArticle,
};
