import { Link } from "react-router-dom";

export const ArticleCard = () => {
  return (
    <>
      <article className="flex flex-col bg-slate-100 rounded-xl px-5 py-4">
        <div className="flex flex-wrap text-sm text-slate-500 font-medium">
          <Link
            to={`/user/${"1231421241"}`}
            className="hover:underline mr-4 mb-2"
          >
            John Doe
          </Link>
          <Link
            to={`/?topic=${"1231421241"}`}
            className="hover:underline mr-4 mb-2"
          >
            #Future
          </Link>
          <span>Mar 3</span>
        </div>
        <Link
          to={`/article/${"123132123"}`}
          className="text-lg font-medium text-slate-950 hover:underline"
        >
          Embrace Growth: 5 Simple Steps to Boost Your Personal Development
        </Link>
      </article>
    </>
  );
};
