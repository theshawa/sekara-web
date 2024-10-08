import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon,
  ClockIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { AsyncImage } from "loadable-image";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../context";
import { SERVER_URL } from "../../globals";
import { formatDate } from "../../utils";
import { BookmarkButton } from "../bookmark-button";
import { ClapButton } from "../clap-button";
import { ImagePlacehoder } from "../image-placeholder";
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
  featuredImage,
}) => {
  const { auth } = useAppContext();
  const params = useParams();
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(comments);

  useEffect(() => {
    setCommentCount(comments);
  }, [comments]);

  return (
    <>
      <article className="flex flex-col border rounded-xl px-5 py-4">
        <div className="flex flex-col sm:flex-row w-full">
          <Link
            to={`/app/read/${_id}`}
            className="w-full sm:w-36 aspect-video sm:aspect-[32/28] flex-shrink-0 rounded-md overflow-hidden"
          >
            {featuredImage ? (
              <AsyncImage
                loader={
                  <div className="w-full h-full bg-slate-200 rounded-md flex items-center justify-center">
                    <PhotoIcon className="size-20 text-slate-300" />
                  </div>
                }
                src={`${SERVER_URL}/assets/${featuredImage}`}
                className="w-full h-auto aspect-video sm:aspect-[32/28]"
              />
            ) : (
              <ImagePlacehoder />
            )}
          </Link>

          <div className="flex sm:w-[calc(100%-9rem)] mt-4 sm:mt-0 sm:ml-4 flex-col">
            <div className="flex flex-wrap text-sm text-slate-500 font-medium">
              <div className="flex items-center mb-1">
                {params?.id !== createdBy._id && (
                  <div className="inline-flex items-center">
                    <UserIcon className="size-4 mr-1" />
                    <Link
                      to={`/app/user/${createdBy._id}`}
                      className="hover:underline mr-4"
                    >
                      {createdBy.firstName} {createdBy.lastName}
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to={`/app?topic=${topic._id}`}
                className="hover:underline mr-4 mb-1 capitalize"
              >
                #{topic.title}
              </Link>
              <div className="inline-flex items-center mb-1">
                <ClockIcon className="size-4 mr-1" />
                <span>{formatDate(new Date(createdAt))}</span>
              </div>
            </div>
            <Link
              to={`/app/read/${_id}`}
              className="text-xl font-semibold text-slate-950 line-clamp-2 hover:underline mt-2 lg:mt-2 mb-5"
            >
              {title}
            </Link>
            <div className="flex flex-wrap mt-auto text-sm text-slate-500 font-medium">
              <ClapButton
                disabled={!auth || auth?._id === createdBy._id}
                count={claps}
                _id={_id}
                className="mr-4"
              />
              {!!comments &&
                (!showComments ? (
                  <button
                    onClick={() => setShowComments(true)}
                    title="View Comments"
                    className="inline-flex items-center disabled:opacity-50 hover:scale-105 disabled:hover:scale-100 h-6 disabled:pointer-events-none active:scale-90 mr-4"
                  >
                    <ChatBubbleLeftIcon className="size-4 mr-1" />{" "}
                    {commentCount || 0}
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
                      to={`/app/edit/${_id}`}
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
        {showComments && comments && (
          <CommentsList
            onDelete={() => {
              setCommentCount((cc) => cc - 1);
            }}
            articleId={_id}
          />
        )}
      </article>
    </>
  );
};
