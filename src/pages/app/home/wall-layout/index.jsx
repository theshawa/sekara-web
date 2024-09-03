import { useIsAdmin } from "../../../../hooks/useIsAdmin";
import { TopicsBar } from "./topics-bar";

export const WallLayout = ({ children, rightSideContent, topics = [] }) => {
  const isAdmin = useIsAdmin();
  return (
    <div className="flex flex-col lg:flex-row">
      <TopicsBar topics={topics} />
      <div className="lg:px-10 mt-10 pb-10 lg:mt-0 flex-1">{children}</div>
      <div
        className={`sticky lg:w-[260px] ${
          isAdmin
            ? "max-h-[calc(100vh-120px)] top-[90px]"
            : "max-h-[calc(100vh-100px)] top-[60px]"
        } overflow-auto h-min lg:mt-0 mt-10 border-t lg:border-t-0 border-slate-200 pt-10 lg:pt-0`}
      >
        {rightSideContent}
      </div>
    </div>
  );
};
