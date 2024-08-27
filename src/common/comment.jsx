import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context";
import { useApi } from "../hooks/useApi";
import { formatDate } from "../utils";

export const Comment = ({ createdBy, content, createdAt, _id, onDelete }) => {
  const { auth } = useAppContext();
  const [deleting, setDeleting] = useState(false);
  const api = useApi();
  const deleteComment = async () => {
    setDeleting(true);
    try {
      await api.delete(`/comments/${_id}`);
      onDelete(_id);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex flex-col max-w-md w-full">
      <p className="text-slate-500 text-sm">
        <Link
          to={`/user/${createdBy._id}`}
          className="hover:underline font-medium"
        >
          {createdBy.firstName} {createdBy.lastName}
        </Link>{" "}
        @ {formatDate(new Date(createdAt))}
      </p>
      <p className="text-slate-900 mt-1">{content}</p>
      {auth && auth.user._id === createdBy._id && (
        <button
          onClick={deleteComment}
          disabled={deleting}
          className="action-btn w-max max-w-full mt-2"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};
