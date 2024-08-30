import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { useApi } from "../hooks/useApi";

export const BookmarkButton = ({
  _id,
  bookmarkedBy = [],
  onBookmark = () => {},
}) => {
  const [bookmarking, setBookmarking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const api = useApi();

  const { auth } = useAppContext();

  const toggleBookmark = async () => {
    setBookmarking(true);
    try {
      const { data } = await api.post(`/articles/bookmark/${_id}`);
      setIsBookmarked(data.bookmarked);
      onBookmark(data.bookmarked, _id);
    } catch (error) {
      alert("Failed to bookmark article. Please try again later.");
    } finally {
      setBookmarking(false);
    }
  };

  useEffect(() => {
    setIsBookmarked(bookmarkedBy.includes(auth.user._id));
  }, [bookmarkedBy]);

  return (
    <button
      disabled={bookmarking}
      onClick={toggleBookmark}
      title={isBookmarked ? "Remove Bookmark" : "Bookmark Article"}
      className="flex items-center hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:pointer-events-none active:scale-90 text-slate-500"
    >
      {isBookmarked ? (
        <BookmarkSlashIcon className="size-5" />
      ) : (
        <BookmarkIcon className="size-5" />
      )}
    </button>
  );
};
