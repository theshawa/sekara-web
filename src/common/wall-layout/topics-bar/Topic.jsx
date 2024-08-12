import { Link } from "react-router-dom";

export const Topic = ({ children = "", slug = "" }) => {
  return (
    <Link
      to={`/?topic=${slug}`}
      className="rounded-full h-[40px] flex-shrink-0 w-max max-w-full text-xl flex items-center px-5 hover:bg-slate-200/50 transition-colors duration-300 ease-in-out text-slate-700"
    >
      <span className="mr-2">#</span>
      <span className="whitespace-nowrap flex-1 truncate">{children}</span>
    </Link>
  );
};
