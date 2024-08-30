export const Header = ({
  publishReady,
  publish,
  topics = [],
  selectedTopic,
  selectTopic,
  publishing,
  title = "New Article",
}) => {
  return (
    <header className="border border-slate-200 bg-slate-50/90 backdrop-blur-sm px-4 items-center py-2 rounded-md sticky top-[80px] max-w-screen-sm mx-auto w-full h-max flex mb-10">
      <h3 className="text-slate-900 text-lg font-medium mr-5">✍️ {title}</h3>
      <select
        value={selectedTopic}
        onChange={(e) => selectTopic(e.target.value)}
        className={`w-max mr-2 ml-auto h-full px-3 py-2 font-medium bg-slate-200 outline-none capitalize rounded-md ${
          selectedTopic ? "text-slate-900" : "text-slate-500"
        }`}
      >
        <option value="" disabled>
          Select Topic
        </option>
        {topics.map((topic, i) => (
          <option key={i} value={topic._id} className="text-slate-900 text-xl">
            #{topic.title}
          </option>
        ))}
      </select>
      <button
        className="btn"
        disabled={!publishReady || publishing}
        onClick={publish}
      >
        {publishing ? "Publishing..." : "Publish"}
      </button>
    </header>
  );
};
