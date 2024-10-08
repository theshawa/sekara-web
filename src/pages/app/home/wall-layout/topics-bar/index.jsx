import { useState } from "react";
import { useIsAdmin } from "../../../../../hooks/useIsAdmin";
import { SearchBar } from "./Searchbar";
import { Topic } from "./Topic";

export const TopicsBar = ({ topics = [] }) => {
  const [showing, setShowing] = useState(false);
  const isAdmin = useIsAdmin();
  return (
    <div
      className={`flex flex-col w-full flex-shrink-0 lg:w-[260px] sticky border py-2 md:py-5 overflow-auto px-5 z-50 bg-slate-50/90 backdrop-blur-sm rounded-[10px] ${
        isAdmin
          ? "max-h-[calc(100vh-120px)] top-[90px]"
          : "max-h-[calc(100vh-100px)] top-[60px]"
      }`}
    >
      <div
        className={`flex sticky z-20 top-0 ${
          showing ? "mb-5" : ""
        } h-[40px] flex-shrink-0`}
      >
        <SearchBar />
        <button
          onClick={() => setShowing((os) => !os)}
          className="flex-shrink-0 ml-2 rounded-full bg-slate-200 px-4 py-2 lg:hidden"
        >
          {showing ? "Hide" : "Show"} Topics
        </button>
      </div>
      <div
        className={`flex-col space-y-1 lg:pt-5 ${
          showing ? "flex" : "hidden lg:flex"
        }`}
      >
        <Topic _id="" title="All Topics" onClick={() => setShowing(false)} />
        {topics.map((topic, i) => (
          <Topic {...topic} key={i} onClick={() => setShowing(false)} />
        ))}
      </div>
    </div>
  );
};
