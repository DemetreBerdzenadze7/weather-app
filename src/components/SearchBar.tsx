import { getCoordinates, getWeather } from "../api/weather";

function SearchBar() {
  return (
    <form className="mx-auto flex max-w-164 flex-col gap-3 md:flex-row md:gap-4">
      <div className="relative flex-1">
        <img
          src="/images/icon-search.svg"
          alt=""
          className="absolute top-1/2 left-6 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search for a place..."
          className="h-14 w-full rounded-xl bg-neutral-800 pr-6 pl-15 text-xl placeholder:text-neutral-200 hover:bg-neutral-700"
        />
      </div>

      <button className="h-14 rounded-xl bg-blue-500 px-6 text-xl hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
