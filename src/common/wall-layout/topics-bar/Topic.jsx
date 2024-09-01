import { useNavigate, useSearchParams } from "react-router-dom";

export const Topic = ({ title = "", _id = "", onClick = () => {} }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <button
      onClick={() => {
        const csp = searchParams;
        if (_id === "") {
          csp.delete("topic");
        } else {
          csp.set("topic", _id);
        }
        navigate({ search: csp.toString(), pathname: "/" });
        onClick();
      }}
      disabled={
        (!searchParams.get("topic") && _id === "") ||
        searchParams.get("topic") === _id
      }
      className="rounded-full h-[40px] flex-shrink-0 w-max max-w-full text-xl flex items-center px-5 hover:bg-slate-200/50 disabled:bg-slate-200 disabled:pointer-events-none text-slate-700"
    >
      <span className="mr-1">#</span>
      <span className="whitespace-nowrap font-medium flex-1 truncate capitalize">
        {title}
      </span>
    </button>
  );
};
