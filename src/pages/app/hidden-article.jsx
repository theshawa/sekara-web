import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiWithAuth } from "../../api";
import { useHandleApiError } from "../../hooks/useHandleApiError";
import { useIsAdmin } from "../../hooks/useIsAdmin";

export const HiddenArticlePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleError = useHandleApiError();
  const params = useParams();
  const isAdmin = useIsAdmin();

  const unhideArticle = async () => {
    setLoading(true);
    const yes = confirm("Are you sure you want to unhide this article?");
    if (!yes) {
      setLoading(false);
      return;
    }
    try {
      await apiWithAuth().post(`/articles/toggle-hidden/${params.id}`);
      navigate(`/app/read/${params.id}`, { replace: true });
    } catch (error) {
      handleError(error, "unhide article");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center text-center mt-10">
      <EyeSlashIcon className="size-10 mb-2" />
      <h1>Oops! This article is hidden.</h1>
      <p className="mt-5 max-w-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
        eius voluptatem ut dolor necessitatibus esse, quia eligendi dolore
        ratione architecto optio, fuga delectus accusamus sint harum reiciendis.
        Aliquid, error cupiditate!
      </p>
      {isAdmin && (
        <button
          onClick={unhideArticle}
          disabled={loading}
          className="action-btn mt-10"
        >
          {loading ? "Unhiding..." : "Unhide"}
        </button>
      )}
    </div>
  );
};
