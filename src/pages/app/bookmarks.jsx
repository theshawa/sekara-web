import { useCallback, useEffect, useState } from "react";
import { apiWithAuth } from "../../api";
import { ArticleCard } from "../../common/article-card";
import { LoadingSpinner } from "../../common/loading-spinner";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";

export const BookmarksPage = () => {
  useRedirectOnAuth({
    authRequired: true,
    redirectTo: "/sign-in",
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleError = useHandleApiError();

  useEffect(() => {
    const loadBookmarks = async () => {
      setLoading(true);
      try {
        const { data } = await apiWithAuth().get("/articles/bookmarks");
        setArticles(data);
      } catch (error) {
        handleError(error, "load bookmarks");
      } finally {
        setLoading(false);
      }
    };
    loadBookmarks();
  }, [handleError]);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiWithAuth().get("/articles/bookmarks");
      setArticles(data);
    } catch (error) {
      handleError(error, "load bookmarks");
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  return (
    <div className="flex flex-col space-y-5 py-10 max-w-screen-sm mx-auto w-full">
      {loading ? (
        <div className="mx-auto mt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <p className="text-center text-slate-700 mb-10">
            {articles.length
              ? `${articles.length}  Article${
                  articles.length === 1 ? "" : "s"
                } Bookmarked.`
              : "No bookmarks yet. Bookmark an article to appear here."}{" "}
          </p>
          {articles.map((article, i) => (
            <ArticleCard
              key={i}
              {...article}
              onBookmark={() => {
                reload();
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};
