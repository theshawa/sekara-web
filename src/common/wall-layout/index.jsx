import { TopicsBar } from "./topics-bar";

export const WallLayout = ({ children, rightSideContent, topics = [] }) => {
  return (
    <div className="flex flex-col lg:flex-row mt-2.5">
      <TopicsBar topics={topics} />
      <div className="lg:px-10 flex-1 mt-10 lg:mt-0">{children}</div>
      <div className="sticky top-[60px] h-min lg:mt-0 mt-10 border-t lg:border-t-0 border-slate-200 pt-10 lg:pt-0">
        {rightSideContent}
      </div>
    </div>
  );
};
