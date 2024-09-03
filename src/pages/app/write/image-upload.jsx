import { PhotoIcon } from "@heroicons/react/24/solid";
import { SERVER_URL } from "../../../globals";

export const ImageUpload = ({ file, setFile, reset }) => {
  return (
    <div className="flex flex-col w-full max-w-screen-sm mx-auto mb-5">
      {file ? (
        <>
          <img
            className="w-full aspect-video object-cover bg-slate-100 border border-slate-200 rounded-xl"
            src={
              typeof file !== "string"
                ? URL.createObjectURL(file)
                : `${SERVER_URL}/assets/${file}`
            }
          />
          <div className="flex space-x-2 w-max mx-auto max-w-full mt-4">
            {reset && (
              <button onClick={reset} className="action-btn">
                Reset Image
              </button>
            )}
            <button onClick={() => setFile(null)} className="action-btn">
              Clear Image
            </button>
          </div>
        </>
      ) : (
        <>
          <label className="w-full h-36 p-5 rounded-xl border border-slate-200 cursor-pointer bg-slate-100 hover:bg-slate-200/60 flex flex-col items-center justify-center">
            <PhotoIcon className="size-20 text-slate-400" />
            <p className="">Upload Featured Image</p>
            <input
              onChange={(e) => {
                if (e.target.files.length === 0) return;
                setFile(e.target.files[0]);
              }}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
          <div className="flex space-x-2 w-max mx-auto max-w-full mt-4">
            {reset && (
              <button onClick={reset} className="action-btn">
                Reset Image
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
