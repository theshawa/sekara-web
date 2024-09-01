import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { apiWithAuth } from "../../api";
import { AddComment } from "../../common/add-comment";
import { Comment } from "../../common/comment";
import { useAppContext } from "../../context";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { ActionBar } from "./action-bar";
import "./styles.css";

export const ReadPage = () => {
  const { article, comments } = useLoaderData();
  const { auth } = useAppContext();
  const [currentCommentsCount, setCurrentCommentsCount] = useState(0);
  const [currentComments, setCurrentComments] = useState(comments);
  const [deleting, setDeleting] = useState(false);
  const [togglingHidden, setTogglingHidden] = useState(false);
  const [hidden, setHidden] = useState(false);
  const handleError = useHandleApiError();

  const isAdmin = useIsAdmin();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin && article.hidden) {
      navigate(`/hidden/${article._id}`, { replace: true });
    }
  }, [article.hidden, navigate, isAdmin]);

  useEffect(() => {
    setHidden(article.hidden);
  }, [article.hidden]);

  useEffect(() => {
    setCurrentCommentsCount(article.comments);
  }, [article.comments]);

  const deleteArticle = async () => {
    setDeleting(true);
    const msg = prompt(
      "Are you sure you want to delete this article? Type 'DELETE' to confirm."
    );
    if (msg !== "DELETE") {
      setDeleting(false);
      return;
    }
    try {
      await apiWithAuth().delete(`/articles/${article._id}`);
      navigate("/", { replace: true });
    } catch (error) {
      handleError(error, "delete article");
    } finally {
      setDeleting(false);
    }
  };

  const toggleHidden = async () => {
    setTogglingHidden(true);
    const yes = confirm(
      `Are you sure you want to ${hidden ? "unhide" : "hide"} this article?`
    );
    if (!yes) {
      setTogglingHidden(false);
      return;
    }
    try {
      const { data } = await apiWithAuth().post(
        `/articles/toggle-hidden/${article._id}`
      );
      setHidden(data.hidden);
    } catch (error) {
      handleError(error, "toggle hidden article");
    } finally {
      setTogglingHidden(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-screen-sm mx-auto pt-10">
      <h1 className="text-4xl md:text-5xl font-medium ">{article.title}</h1>
      <ActionBar {...article} />
      <div className="flex mt-5 items-center flex-wrap text-slate-500 font-medium text-sm">
        {auth && auth._id === article.createdBy._id && (
          <>
            <Link to={`/edit/${article._id}`} className="action-btn mr-2 mb-1">
              Edit
            </Link>
            <button
              onClick={deleteArticle}
              disabled={deleting}
              className="action-btn mr-2 mb-1"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
        {isAdmin ? (
          <button
            disabled={togglingHidden}
            onClick={toggleHidden}
            className="action-btn mb-1 mr-2"
          >
            {togglingHidden
              ? hidden
                ? "Unhiding..."
                : "Hiding..."
              : hidden
              ? "Unhide"
              : "Hide"}
          </button>
        ) : null}
      </div>
      <div
        className="prose pb-10 pt-8 prose-blue overflow-auto"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
      <div className="flex flex-col pb-10">
        <h2 className="mt-5 border-t pt-5">
          {currentCommentsCount || "No"} Comment
          {currentCommentsCount === 1 ? "" : "s"}
        </h2>
        {!!currentComments.length && (
          <div className="flex flex-col mt-5 mb-4 space-y-4">
            {currentComments.map((comment) => (
              <Comment
                key={comment._id}
                {...comment}
                onDelete={(_id) => {
                  setCurrentComments((prevComments) =>
                    prevComments.filter((c) => c._id !== _id)
                  );
                  setCurrentCommentsCount((prevCount) => prevCount - 1);
                }}
              />
            ))}
          </div>
        )}
        {auth && (
          <>
            {!currentCommentsCount && (
              <p className="mt-5">Be the first one to comment.</p>
            )}
            <AddComment
              article={article._id}
              onAdd={(comment) => {
                setCurrentComments((prevComments) => [
                  ...prevComments,
                  comment,
                ]);
                setCurrentCommentsCount((prevCount) => prevCount + 1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
