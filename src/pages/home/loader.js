import { api } from "../../api";

export const HomePageLoaderFunction = async ({ request }) => {
  const { data: topics } = await api.get("/topics");

  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query");
  const topicId = searchParams.get("topic");
  const selectedTopic = topics.find((topic) => topic._id === topicId);

  const params = new URLSearchParams();
  if (query) {
    params.append("query", query);
  }
  if (topicId) {
    params.append("topic", topicId);
  }

  const { data: articles } = await api.get(
    `/articles${params.toString() ? `?${params.toString()}` : ""}`
  );

  return { query, selectedTopic, articles, topics };
};
