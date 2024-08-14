import { SearchBar } from "./searchbar";
import { Topic } from "./Topic";

export const TopicsBar = () => {
  return (
    <div className="flex flex-col w-[260px] sticky top-[80px] bg-slate-100 py-5 overflow-auto px-5 rounded-[10px] h-[calc(100vh-120px)]">
      <SearchBar />
      <Topic slug="future">Future</Topic>
      <Topic slug="technology">Technology</Topic>
      <Topic slug="science">Science</Topic>
      <Topic slug="business">Business</Topic>
      <Topic slug="health">Health</Topic>
      <Topic slug="sports">Sports</Topic>
      <Topic slug="music">Music</Topic>
      <Topic slug="art">Art</Topic>
      <Topic slug="food">Food</Topic>
      <Topic slug="travel">Travel</Topic>
      <Topic slug="fashion">Fashion</Topic>
      <Topic slug="movies">Movies</Topic>
      <Topic slug="books">Books</Topic>
      <Topic slug="history">History</Topic>
      <Topic slug="politics">Politics</Topic>
      <Topic slug="environment">Environment</Topic>
      <Topic slug="education">Education</Topic>
      <Topic slug="finance">Finance</Topic>
      <Topic slug="gaming">Gaming</Topic>
      <Topic slug="fitness">Fitness</Topic>
      <Topic slug="photography">Photography</Topic>
    </div>
  );
};
