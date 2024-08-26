import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col text-center items-center justify-center p-5">
      <h2 className="text-xl mb-2">Oops! Something went wrong.</h2>
      {error.message && <p>{error.message}</p>}
      <button
        className="btn mt-5"
        onClick={() => {
          navigate(0);
        }}
      >
        Load again
      </button>
    </div>
  );
};
