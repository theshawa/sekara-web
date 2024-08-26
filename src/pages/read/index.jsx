import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AddComment } from "../../common/add-comment";
import { Comment } from "../../common/comment";
import { useAppContext } from "../../context";
import { ActionBar } from "./action-bar";
import "./styles.css";

export const ReadPage = () => {
  const { article } = useLoaderData();
  const { auth } = useAppContext();
  const [comments, setComments] = useState([
    {
      content: "Hello",
      updatedAt: Date.now(),
      user: { firstName: "Theshawa", lastName: "Dasun" },
    },
  ]);

  return (
    <div className="flex flex-col w-full max-w-screen-sm mx-auto pt-10">
      <h1 className="text-4xl md:text-5xl">{article.title}</h1>
      <ActionBar {...article} />
      <div
        className="prose py-10 prose-blue"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
      <div className="flex flex-col pb-10">
        <h2 className="mt-5 border-t pt-5">
          {comments.length || "No"} Comment{comments.length > 1 ? "s" : ""}
        </h2>
        <div className="flex flex-col mt-5 mb-4">
          <Comment
            content={"Hello"}
            updatedAt={Date.now()}
            user={{ firstName: "Theshawa", lastName: "Dasun" }}
          />
        </div>
        {auth && (
          <>
            {!comments.length && (
              <p className="mt-5">Be the first one to comment.</p>
            )}
            <AddComment
              articleId={article._id}
              onAdd={(comment) => {
                setComments((prevComments) => [comment, ...prevComments]);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
