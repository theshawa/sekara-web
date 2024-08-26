import { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import { MAX_CHARACTER_TRESHOLD, USER_ROLES } from "../../globals";
import { useApi } from "../../hooks/useApi";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";
import { Body } from "./body";
import { Header } from "./header";
import { Title } from "./title";

export const WritePage = () => {
  const { topics } = useLoaderData();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();
  const api = useApi();
  const { auth, setAuth } = useAppContext();

  const publish = async () => {
    setPublishing(true);
    try {
      const { data } = await api.post("/articles/create", {
        title,
        content,
        topic,
      });
      const articleId = data._id;
      if (auth.user.role === USER_ROLES.user) {
        const newAuth = {
          ...auth,
          user: { ...auth.user, role: USER_ROLES.user_writer },
        };
        localStorage.setItem("auth", JSON.stringify(newAuth));
        setAuth(newAuth);
      }
      navigate(`/read/${articleId}`);
    } catch (error) {
      alert("Failed to publish article. Please try again later.");
    } finally {
      setPublishing(false);
    }
  };

  useRedirectOnAuth({
    authRequired: true,
    redirectTo: "/sign-up",
  });

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
