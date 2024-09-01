export const Title = ({ title, setTitle }) => {
  return (
    <div className="flex w-full max-w-screen-sm mx-auto mb-5">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="text-3xl md:text-4xl font-medium bg-transparent placeholder:text-slate-500 w-full"
        placeholder="Title"
      />
    </div>
  );
};
