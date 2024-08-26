export const Title = ({ title, setTitle }) => {
  return (
    <div className="flex w-full max-w-screen-sm mx-auto">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="text-2xl md:text-3xl bg-transparent placeholder:text-slate-500"
        placeholder="Title"
      />
    </div>
  );
};
