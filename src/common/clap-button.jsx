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

  const icon = (
    <svg
      className="mr-1 size-4"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.32613 6.11733L3.89403 7.71396H3.89257C5.15833 8.99874 7.07311 9.53144 8.26334 8.3183C9.34284 7.23646 9.58778 5.57268 8.82069 4.29835L7.48966 1.69897C7.23079 1.30801 6.86704 0.788734 6.50917 0.98421C6.14983 1.17894 6.50917 2.14811 6.50917 2.14811L7.08118 3.58956L4.34871 0.670106C3.7349 -0.0446509 3.27289 -0.156565 2.93481 0.187384C2.6928 0.433594 2.73974 0.826039 3.28462 1.37964C3.65203 1.75492 4.66919 2.83974 4.66919 2.83974C4.79386 2.96956 4.73006 3.2016 4.60099 3.32843C4.53419 3.39707 4.44608 3.44005 4.35165 3.45005C4.30816 3.45047 4.26507 3.44174 4.22506 3.42441C4.18505 3.40708 4.149 3.38151 4.11917 3.34932C4.11917 3.34932 2.35913 1.50722 2.06359 1.20804C1.81132 0.94989 1.47471 0.805148 1.18797 1.09612C0.888758 1.39904 0.987761 1.89071 1.26863 2.17572C1.52164 2.43387 2.96268 3.88949 3.23768 4.16779L3.28315 4.21255C3.40782 4.34312 3.48042 4.6811 3.35135 4.80943C3.20982 4.94969 3.01915 5.05564 2.85414 5.01311C2.72771 4.97965 2.61387 4.90876 2.52707 4.80943C2.52707 4.80943 1.46737 3.63508 1.02076 3.17996C0.722288 2.87705 0.361479 2.93151 0.119473 3.17996C-0.265537 3.57091 0.312344 4.13496 1.38817 5.18769C1.66978 5.46226 1.98512 5.77039 2.32613 6.11733ZM8.53908 0.731285C8.81189 0.514918 9.23577 0.522379 9.49464 0.913332V0.91184L10.6409 3.15459L10.6673 3.2098C11.3163 4.605 10.921 6.26356 10.2918 7.0589L10.2661 7.09172C10.1114 7.28869 10.0139 7.41254 9.72345 7.54684C10.7369 6.16284 10.4297 4.95193 9.54158 3.47616L8.39168 1.42664L8.39021 1.39904C8.37775 1.17521 8.36161 0.869312 8.53908 0.731285Z"
        fill="currentColor"
      />
    </svg>
  );

  if (disabled) {
    return (
      <div
        title={`${currentCount} Claps`}
        className={`inline-flex items-center ${className || ""}`}
      >
        {icon}
        {currentCount}
      </div>
    );
  }

  return (
    <button
      title="Add a Clap"
      onClick={clap}
      className={`inline-flex items-center hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:pointer-events-none active:scale-90 ${
        className || ""
      }`}
      disabled={loading}
    >
      {icon} {currentCount}
    </button>
  );
};
