import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../context";
import { formatDate } from "../../utils";
import { BookmarkButton } from "../bookmark-button";
import { ClapButton } from "../clap-button";
import { CommentsList } from "./comments-list";

export const ArticleCard = ({
  title,
  createdBy,
  topic,
  createdAt,
  _id,
  claps,
  comments,
  bookmarkedBy = [],
  onBookmark = () => {},
}) => {
  const { auth } = useAppContext();
  const params = useParams();
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <article className="flex flex-col bg-slate-100 rounded-xl px-5 py-4">
        <div className="flex">
          <div className="w-32 h-28 bg-slate-200 rounded-md flex items-center justify-center">
            <PhotoIcon className="size-20 text-slate-300" />
          </div>
          <div className="flex flex-1 ml-4 flex-col">
            <div className="flex flex-wrap text-sm text-slate-500 font-medium">
              <div className="flex items-center mb-1">
                {params?.id !== createdBy._id && (
                  <>
                    <span className="grayscale">✍️</span>
                    <Link
                      to={`/user/${createdBy._id}`}
                      className="hover:underline mr-4"
                    >
                      {createdBy.firstName} {createdBy.lastName}
                    </Link>
                  </>
                )}
              </div>
              <Link
                to={`/?topic=${topic._id}`}
                className="hover:underline mr-4 mb-1 capitalize"
              >
                #{topic.title}
              </Link>
              <div className="flex items-center mb-1">
                <span className="grayscale">🕑</span>
                <span>{formatDate(new Date(createdAt))}</span>
              </div>
            </div>
            <Link
              to={`/read/${_id}`}
              className="text-xl font-semibold text-slate-950 hover:underline mt-2 lg:mt-1"
            >
              {title}
            </Link>
            <div className="flex flex-wrap mt-auto text-sm">
              <ClapButton
                disabled={!auth || auth._id === createdBy._id}
                count={claps}
                _id={_id}
                className="mr-4"
              />
              {!!comments &&
                (!showComments ? (
                  <button
                    onClick={() => setShowComments(true)}
                    title="View Comments"
                    className="flex items-center disabled:opacity-50 hover:scale-105 disabled:hover:scale-100 h-6 disabled:pointer-events-none active:scale-90 mr-4"
                  >
                    <span className="text-xl">📜</span> {comments || 0}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowComments(false)}
                    title="Hide Comments"
                    className="flex items-center active:scale-95 hover:underline mr-4 h-6"
                  >
                    Hide Comments
                  </button>
                ))}
              {auth && (
                <div className="flex space-x-3 ml-auto">
                  <BookmarkButton
                    onBookmark={onBookmark}
                    bookmarkedBy={bookmarkedBy}
                    _id={_id}
                  />
                  {auth._id === createdBy._id && (
                    <Link
                      to={`/edit/${_id}`}
                      title="Edit Article"
                      className="active:scale-95"
                    >
                      <PencilSquareIcon className="size-5 text-slate-500" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {showComments && comments && <CommentsList articleId={_id} />}
      </article>
    </>
  );
};
