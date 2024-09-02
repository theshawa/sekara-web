import { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { apiWithAuth } from "../../api";
import { useAppContext } from "../../context";
import { MAX_CHARACTER_TRESHOLD, USER_ROLES } from "../../globals";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";
import { Body } from "./body";
import { Header } from "./header";
import { ImageUpload } from "./image-upload";
import { Title } from "./title";

export const WritePage = () => {
  useRedirectOnAuth({
    authRequired: true,
    redirectTo: "/sign-in",
  });

  const { topics } = useLoaderData();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [topic, setTopic] = useState("");
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();
  const handleError = useHandleApiError();

  const { auth, setAuth } = useAppContext();

  const publish = async () => {
    setPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("topic", topic);
      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }
      const { data } = await apiWithAuth().post("/articles/create", formData);
      const articleId = data._id;
      if (auth.role === USER_ROLES.user) {
        setAuth({ ...auth, role: USER_ROLES.user_writer });
      }
      navigate(`/read/${articleId}`);
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
      />
      <Title title={title} setTitle={setTitle} />
      <ImageUpload file={featuredImage} setFile={setFeaturedImage} />
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
