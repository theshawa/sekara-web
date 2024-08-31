import { useCallback, useEffect, useState } from "react";
import { apiWithAuth } from "../../api";
import { ArticleCard } from "../../common/article-card";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";
import { LoadingSpinner } from "../../layout/loading-screen";

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
    <div className="flex flex-col space-y-5 pt-10 max-w-screen-sm mx-auto w-full">
      {loading ? (
        <div className="mx-auto mt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {articles.map((article, i) => (
            <ArticleCard
              key={i}
              {...article}
              onBookmark={() => {
                reload();
              }}
            />
          ))}
          {!articles.length && (
            <p className="text-center text-slate-400">
              No bookmarks yet. Bookmark an article to appear here.
            </p>
          )}
        </>
      )}
    </div>
  );
};
