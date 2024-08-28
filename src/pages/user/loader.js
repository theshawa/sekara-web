import { api } from "../../api";
import { MAX_ARTICLES_PER_PAGE } from "../../globals";

export const UserPageLoaderFunction = async ({ params }) => {
  const { data: user } = await api.get(`/user/${params.id}`);
  const {
    data: { articles, totalCount },
  } = await api.get(
    `/articles?createdBy=${params.id}&page=0&limit=${MAX_ARTICLES_PER_PAGE}`
  );
  const totalClaps = articles.reduce((acc, article) => acc + article.claps, 0);
  return { user, articles, articlesCount: totalCount, totalClaps };
};
