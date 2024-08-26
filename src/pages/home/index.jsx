import { useLoaderData } from "react-router-dom";
import { ArticleCard } from "../../common/article-card";
import { WallLayout } from "../../common/wall-layout";
import { PageTitle } from "./page-title";

export const HomePage = () => {
  const { query, selectedTopic, data, topics } = useLoaderData();

  return (
    <WallLayout topics={topics} rightSideContent={<>Riht side</>}>
      <PageTitle query={query} selectedTopic={selectedTopic} />
      <div className="flex flex-col">
        <ArticleCard />
      </div>
    </WallLayout>
  );
};
