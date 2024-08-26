import { useState } from "react";
import { useApi } from "../../../hooks/useApi";

export const ClapBtn = ({ count, _id }) => {
  const [currentCount, setCurrentCount] = useState(count);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const clap = async () => {
    setLoading(true);
    try {
      await api.post(`/articles/clap/${_id}`);
      setCurrentCount(currentCount + 1);
    } catch (error) {
      console.log(error);

      alert("Failed to clap article. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      title="Add a Clap"
      onClick={clap}
      className="flex items-center disabled:opacity-50 disabled:pointer-events-none active:scale-90"
      disabled={loading}
    >
      👏 {currentCount}
    </button>
  );
};
