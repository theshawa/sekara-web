import { useEffect, useState } from "react";
import { api } from "../../api";
import { useAppContext } from "../../context";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { LoadingSpinner } from "../../layout/loading-screen";
import { Comment } from "../comment";

export const CommentsList = ({ articleId, onDelete }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleError = useHandleApiError();
  const { auth } = useAppContext();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { data } = await api.get(`/comments?article=${articleId}`);
        setComments(data);
      } catch (error) {
        handleError(error, "load comments");
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [articleId, handleError]);
  return (
    <div className="mt-5  border rounded-md border-slate-300 overflow-auto max-h-64">
      <div
        className={`flex flex-col px-5 py-3 sticky top-0 bg-slate-100 ${
          loading ? "" : "border-b"
        } border-slate-300`}
      >
        <p className="font-medium text-slate-900">
          {loading ? (
            <LoadingSpinner />
          ) : (
            `${comments.length || "No"} Comment${
              comments.length === 1 ? "" : "s"
            }`
          )}
        </p>
        {auth && (
          <p className="text-xs mt-1 text-slate-400">
            Read article to add comments.
          </p>
        )}
      </div>
      {!!comments.length && (
        <div className="flex flex-col space-y-5 px-5 py-5">
          {comments.map((comment, i) => (
            <Comment
              key={i}
              {...comment}
              onDelete={(id) => {
                setComments((oc) => oc.filter((c) => c._id !== id));
                onDelete(id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
