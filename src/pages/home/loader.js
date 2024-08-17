import { api } from "../../api";

export const HomeLoaderFunction = async ({ request }) => {
  const { data: topics } = await api.get("/topics");

  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query");
  const topicId = searchParams.get("topic");
  const selectedTopic = topics.find((topic) => topic._id === topicId);

  return { query, selectedTopic, data: [], topics };
};
