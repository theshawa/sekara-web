import { LoadingSpinner } from "../../../common/loading-spinner";

export const LoadingScreen = () => {
  return (
    <div className="w-full h-screen fixed z-[99999] top-0 left-0 bg-slate-50 flex items-center justify-center">
      {/* <div className="size-5 rounded-full border-2  border-transparent border-b-slate-600 border-r-slate-600 animate-spin"></div> */}
      <LoadingSpinner />
    </div>
  );
};
