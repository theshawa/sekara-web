import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MAX_CHARACTER_TRESHOLD } from "../../globals";
import { useApi } from "../../hooks/useApi";
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
  const api = useApi();

  useEffect(() => {
    setContent(article.content);
    setTitle(article.title);
    setTopic(article.topic._id);
  }, [article]);

  const publish = async () => {
    setPublishing(true);
    try {
      await api.post(`/articles/update/${article._id}`, {
        title,
        content,
        topic,
      });
      navigate(`/read/${article._id}`);
    } catch (error) {
      alert("Failed to publish article. Please try again later.");
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
