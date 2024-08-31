import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { apiWithAuth } from "../../api";
import { MAX_CHARACTER_TRESHOLD } from "../../globals";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";
import { Body } from "../write/body";
import { Header } from "../write/header";
import { Title } from "../write/title";

export const EditPage = () => {
  useRedirectOnAuth({
    authRequired: true,
    redirectTo: "/sign-in",
  });

  const { topics, article } = useLoaderData();
  const [content, setContent] = useState(article.content);
  const [title, setTitle] = useState(article.title);
  const [topic, setTopic] = useState(article.topic._id);
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setContent(article.content);
    setTitle(article.title);
    setTopic(article.topic._id);
  }, [article]);
  const handleError = useHandleApiError();

  const publish = async () => {
    setPublishing(true);
    try {
      await apiWithAuth().post(`/articles/update/${article._id}`, {
        title,
        content,
        topic,
      });
      navigate(`/read/${article._id}`);
    } catch (error) {
      handleError(error, "publish article");
    } finally {
      setPublishing(false);
    }
  };

  const renderingContent = useMemo(() => {
    const div = document.createElement("div");
    div.innerHTML = content;
    return div.innerText.trim();
  }, [content]);

  return (
    <div className="flex flex-col mt-10 pb-20">
      <Header
        topics={topics}
        selectTopic={setTopic}
        selectedTopic={topic}
        publishing={publishing}
        publishReady={
          topic &&
          title.trim() &&
          renderingContent &&
          renderingContent.length >= MAX_CHARACTER_TRESHOLD
        }
        publish={publish}
        title="Edit Article"
      />
      <Title title={title} setTitle={setTitle} />
      <Body content={content} setContent={setContent} />
      {renderingContent && renderingContent.length < MAX_CHARACTER_TRESHOLD && (
        <p className="font-bold max-w-screen-sm mx-auto w-full text-xs">
          *Article content must have at least {MAX_CHARACTER_TRESHOLD}{" "}
          characters. {renderingContent.length} character
          {renderingContent.length === 1 ? "" : "s"} so far.
        </p>
      )}
    </div>
  );
};
