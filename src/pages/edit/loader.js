import { api } from "../../api";

export const EditPageLoaderFunction = async ({ params }) => {
  const { data: article } = await api.get(`/articles/one/${params.id}`);
  const { data: topics } = await api.get("/topics");

  return { article, topics };
};
