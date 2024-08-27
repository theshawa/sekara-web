import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context";
import { formatDate } from "../../utils";
import { ClapButton } from "../clap-button";

export const ArticleCard = ({
  title,
  createdBy,
  topic,
  createdAt,
  _id,
  claps,
  comments,
}) => {
  const { auth } = useAppContext();
  return (
    <>
      <article className="flex flex-col bg-slate-100 rounded-xl px-5 py-4">
        <div className="flex flex-wrap text-sm text-slate-500 font-medium">
          <Link
            to={`/user/${createdBy._id}`}
            className="hover:underline mr-4 mb-2"
          >
            {createdBy.firstName} {createdBy.lastName}
          </Link>
          <Link
            to={`/?topic=${topic._id}`}
            className="hover:underline mr-4 mb-2 capitalize"
          >
            #{topic.title}
          </Link>
          <span>{formatDate(new Date(createdAt))}</span>
        </div>
        <Link
          to={`/read/${_id}`}
          className="text-lg font-medium text-slate-950 hover:underline"
        >
          {title}
        </Link>
        <div className="flex flex-wrap mt-5 text-sm">
          <ClapButton
            disabled={!auth}
            count={claps}
            _id={_id}
            className="mr-4"
          />
          <button
            title="View Comments"
            className="flex items-center disabled:opacity-50 disabled:pointer-events-none active:scale-90 mr-4"
          >
            🗨️ {comments || 0}
          </button>
          {auth && (
            <button
              title="Bookmark Article"
              className="flex items-center disabled:opacity-50 disabled:pointer-events-none active:scale-90 ml-auto text-slate-500"
            >
              <BookmarkIcon className="size-5" />
            </button>
          )}
        </div>
      </article>
    </>
  );
};
