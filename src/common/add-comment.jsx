import { useState } from "react";
import { useApi } from "../hooks/useApi";

export const AddComment = ({ article, onAdd }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const commentData = {
        content: comment,
        article,
      };
      const { data } = await api.post(`/comments/create`, commentData);
      setComment("");

      onAdd(data);
    } catch (err) {
      alert("Failed to add comment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-5 max-w-sm w-full"
    >
      <h3 className="font-medium">Add Your Comment</h3>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="input mt-2"
        placeholder="Write your comment here"
        required
      ></textarea>
      <button
        disabled={!comment.trim().length || loading}
        type="submit"
        className="btn w-max max-w-full mt-2"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
};
