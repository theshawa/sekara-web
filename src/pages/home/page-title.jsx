export const PageTitle = ({ query, selectedTopic }) => {
  if (!query && !selectedTopic) {
    return null;
  }
  return (
    <h1 className="alt">
      Articles for{" "}
      {selectedTopic ? (
        <>
          topic:{" "}
          <span className="font-bold capitalize">#{selectedTopic.title}</span>
        </>
      ) : (
        ""
      )}
      {query && selectedTopic ? " and " : ""}
      {query ? (
        <>
          query: <q>{query}</q>
        </>
      ) : (
        ""
      )}
    </h1>
  );
};
