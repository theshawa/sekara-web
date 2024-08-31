import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { api } from "../../api";
import { ArticleCard } from "../../common/article-card";
import { WallLayout } from "../../common/wall-layout";
import { useAppContext } from "../../context";
import { MAX_ARTICLES_PER_PAGE, USER_ROLES } from "../../globals";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { PageTitle } from "./page-title";

const Banner = ({ title, description, link, linkTitle }) => {
  return (
    <div className="flex flex-col w-full bg-slate-100 p-5 rounded-xl lg:w-72 max-w-sm lg:max-w-none flex-shrink-0 mb-5">
      <h2>{title}</h2>
      <p className="text-sm mt-2">{description}</p>
      <Link to={link} className="mt-5 btn">
        {linkTitle}
      </Link>
    </div>
  );
};

export const HomePage = () => {
  const { query, selectedTopic, articles, topics, totalCount } =
    useLoaderData();
  const [showingArticles, setShowingArticles] = useState(articles);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleError = useHandleApiError();
  const { auth } = useAppContext();

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
      handleError(error, "load articles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WallLayout
      topics={topics}
      rightSideContent={
        <>
          {!auth ? (
            <Banner
              title="Want to write?"
              description=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              vel. Cumque quos praesentium suscipit."
              link="/sign-up"
              linkTitle="Get Started"
            />
          ) : (
            <>
              <Banner
                title="We are Sēkara"
                description=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              vel. Cumque quos praesentium suscipit."
                link="/about"
                linkTitle="Learn More"
              />
              {!auth.role !== USER_ROLES.user_writer && (
                <Banner
                  title="Want to write?"
                  description=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,"
                  link="/write"
                  linkTitle="Get Started"
                />
              )}
            </>
          )}
        </>
      }
    >
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
