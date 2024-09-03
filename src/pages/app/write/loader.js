import { api } from "../../../api";

export const WritePageLoaderFunction = async () => {
  const { data: topics } = await api.get("/topics");

  return { topics };
};
