import { TopicsBar } from "./topics-bar";

export const WallLayout = ({ children }) => {
  return (
    <main className="flex flex-col lg:flex-row mt-5">
      <TopicsBar />
      <div className="px-5 md:px-10 flex-1">{children}</div>
      <div className="sticky top-0">Right Side</div>
    </main>
  );
};
