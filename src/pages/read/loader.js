import { api } from "../../api";

export const ReadPageLoader = async ({ params }) => {
  const { data: article } = await api.get(`/articles/${params.id}`);
  const { data: comments } = await api.get(`/comments?article=${params.id}`);

  return { article, comments };
};
