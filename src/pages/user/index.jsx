import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { api } from "../../api";
import { ArticleCard } from "../../common/article-card";
import { MAX_ARTICLES_PER_PAGE } from "../../globals";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { formatDate } from "../../utils";

export const UserPage = () => {
  const { user, articles, articlesCount, totalClaps } = useLoaderData();
  const [showingArticles, setShowingArticles] = useState(articles);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const handleError = useHandleApiError();

  useEffect(() => {
    setShowingArticles(articles);
  }, [articles]);

  useEffect(() => {
    setPage(0);
  }, [params?.id]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const newPage = page + 1;
      const params = new URLSearchParams();

      params.append("createdBy", user._id);
      params.append("page", newPage);
      params.append("limit", MAX_ARTICLES_PER_PAGE);
      const { data } = await api.get(`/articles?${params.toString()}`);
      setShowingArticles([...showingArticles, ...data.articles]);
      setPage(newPage);
    } catch (error) {
      handleError(error, "load articles");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col mt-10 w-full max-w-screen-sm mx-auto pb-10">
      <div className="size-20 rounded-full bg-slate-200 mb-5 flex items-center justify-center">
        <UserIcon className="size-10 text-slate-500" />
      </div>
      <div className="flex flex-wrap">
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <div className="flex items-center ml-5 text-sm font-medium">
          <span className="text-slate-500">👏 {totalClaps}</span>
        </div>
      </div>
      <p className="mt-2">{user.description}</p>
      <p className="mt-5 text-sm text-slate-400">
        Joined at {formatDate(new Date(user.createdAt))}.
      </p>
      <h2 className="mt-10">
        {articlesCount} Article{articlesCount === 1 ? "" : "s"}
      </h2>
      <div className="flex flex-col mt-5 space-y-5">
        {showingArticles.map((article, i) => (
          <ArticleCard key={i} {...article} />
        ))}
      </div>
      {showingArticles.length < articlesCount && (
        <button
          disabled={loading}
          onClick={loadMore}
          className="uppercase text-sm mt-10 mx-auto active:scale-95 disabled:opacity-50 hover:underline"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};
