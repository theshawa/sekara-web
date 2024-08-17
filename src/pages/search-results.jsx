import { useLoaderData, useSearchParams } from "react-router-dom";

export const SearchResultsLoaderFunction = async ({ request }) => {
  const query = new URL(request.url).searchParams.get("query");
  if (!query?.trim()) {
    throw new Error("Query is required");
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = ["asdads", "asdasd"];
  return data;
};

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const data = useLoaderData();
  return (
    <>
      Search Results for <q>{JSON.stringify(data)}</q>
    </>
  );
};
