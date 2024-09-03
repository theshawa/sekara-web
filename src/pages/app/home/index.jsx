import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { api } from "../../../api";
import sekaraBanner from "../../../assets/sekara-banner.png";
import { ArticleCard } from "../../../common/article-card";
import { LoadingSpinner } from "../../../common/loading-spinner";
import { useAppContext } from "../../../context";
import { MAX_ARTICLES_PER_PAGE, USER_ROLES } from "../../../globals";
import { useHandleApiError } from "../../../hooks/useHandleApiError";
import { PageTitle } from "./page-title";
import { WallLayout } from "./wall-layout";

const Banner = ({ title, description, link, linkTitle, img }) => {
  return (
    <div className="flex flex-col w-full border p-5 rounded-xl dm:max-w-sm lg:max-w-none flex-shrink-0 mb-5">
      {img && (
        <img
          alt="Banner Image"
          src={img}
          className="object-cover aspect-video rounded-xl mb-3"
        />
      )}
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
  const { state } = useNavigation();

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
            <>
              <Banner
                title="We are Sēkara"
                img={sekaraBanner}
                description=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              vel. Cumque quos praesentium suscipit."
                link="/"
                linkTitle="Learn More"
              />
              <Banner
                title="Want to write?"
                description=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              vel. Cumque quos praesentium suscipit."
                link="/sign-up"
                linkTitle="Get Started"
              />
            </>
          ) : (
            <>
              {!auth.role !== USER_ROLES.user_writer && (
                <Banner
                  title="Not a writer yet?"
                  description=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,"
                  link="/app/write"
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
        {state === "loading" ? (
          <div className="mx-auto">
            <LoadingSpinner />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </WallLayout>
  );
};
