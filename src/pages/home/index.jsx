import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { api } from "../../api";
import { ArticleCard } from "../../common/article-card";
import { WallLayout } from "../../common/wall-layout";
import { MAX_ARTICLES_PER_PAGE } from "../../globals";
import { PageTitle } from "./page-title";

export const HomePage = () => {
  const { query, selectedTopic, articles, topics, totalCount } =
    useLoaderData();
  const [showingArticles, setShowingArticles] = useState(articles);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowingArticles(articles);
  }, [articles]);

  useEffect(() => {
    setPage(0);
  }, [selectedTopic, query]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const newPage = page + 1;
      const params = new URLSearchParams();
      if (query) {
        params.append("query", query);
      }
      if (selectedTopic) {
        params.append("topic", selectedTopic._id);
      }
      params.append("page", newPage);
      params.append("limit", MAX_ARTICLES_PER_PAGE);
      const { data } = await api.get(`/articles?${params.toString()}`);
      setShowingArticles([...showingArticles, ...data.articles]);
      setPage(newPage);
    } catch (error) {
      alert("An error occurred while loading. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WallLayout topics={topics} rightSideContent={<>Riht side</>}>
      <PageTitle query={query} selectedTopic={selectedTopic} />
      <div className="flex flex-col">
        <div className="flex flex-col space-y-5">
          {showingArticles.map((article, i) => (
            <ArticleCard key={i} {...article} />
          ))}
        </div>
        {showingArticles.length === 0 && (
          <div className="text-slate-500">No articles found!</div>
        )}
        {showingArticles.length < totalCount && (
          <button
            disabled={loading}
            onClick={loadMore}
            className="uppercase text-sm mt-10 mx-auto active:scale-95 disabled:opacity-50 hover:underline"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </WallLayout>
  );
};
