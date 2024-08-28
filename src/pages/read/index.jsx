import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AddComment } from "../../common/add-comment";
import { Comment } from "../../common/comment";
import { useAppContext } from "../../context";
import { useApi } from "../../hooks/useApi";
import { ActionBar } from "./action-bar";
import "./styles.css";

export const ReadPage = () => {
  const { article, comments } = useLoaderData();
  const { auth } = useAppContext();
  const [currentCommentsCount, setCurrentCommentsCount] = useState(0);
  const [currentComments, setCurrentComments] = useState(comments);
  const [deleting, setDeleting] = useState(false);
  const api = useApi();
  const navigate = useNavigate();

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
      await api.delete(`/articles/${article._id}`);
      navigate("/", { replace: true });
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-screen-sm mx-auto pt-10">
      <h1 className="text-4xl md:text-5xl">{article.title}</h1>
      <ActionBar {...article} />
      {auth && auth.user._id === article.createdBy._id && (
        <div className="flex mt-5 items-center flex-wrap text-slate-500 font-medium text-sm">
          <button className="action-btn mr-2 mb-1">Update</button>
          <button
            onClick={deleteArticle}
            disabled={deleting}
            className="action-btn mr-2 mb-1"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
      <div
        className="prose py-10 prose-blue overflow-auto"
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
