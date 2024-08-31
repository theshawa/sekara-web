import { useState } from "react";
import { apiWithAuth } from "../api";
import { useHandleApiError } from "../hooks/useHandleApiError";

export const ClapButton = ({ count, _id, className, disabled = false }) => {
  const [currentCount, setCurrentCount] = useState(count);
  const [loading, setLoading] = useState(false);

  const handleError = useHandleApiError();
  const clap = async () => {
    setLoading(true);
    try {
      await apiWithAuth().post(`/articles/clap/${_id}`);
      setCurrentCount(currentCount + 1);
    } catch (error) {
      handleError(error, "clap article");
    } finally {
      setLoading(false);
    }
  };

  if (disabled) {
    return (
      <div
        title={`${currentCount} Claps`}
        className={`flex items-center ${className || ""}`}
      >
        👏 {currentCount}
      </div>
    );
  }

  return (
    <button
      title="Add a Clap"
      onClick={clap}
      className={`flex items-center hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:pointer-events-none active:scale-90 ${
        className || ""
      }`}
      disabled={loading}
    >
      👏 {currentCount}
    </button>
  );
};
