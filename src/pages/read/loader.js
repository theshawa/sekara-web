import { api } from "../../api";

export const ReadPageLoader = async ({ params }) => {
  const { data } = await api.get(`/articles/${params.id}`);
  return { article: data };
};
