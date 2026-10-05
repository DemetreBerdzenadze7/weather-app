import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { searchCity } from "../api/weather";

interface ICityTypes {
  country: string;
  id: number;
  name: string;
}

function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [searchedCity, setSearchedCity] = useState<ICityTypes[]>([]);
  const { getCurrentWeather } = useWeather();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 2) {
        async function getCity() {
          try {
            const city = await searchCity(search);
            setSearchedCity(city);
          } catch (err) {
            console.error(err);
            setSearchedCity([]);
          }
        }
        getCity();
      } else {
        setSearchedCity([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <form
      className="mx-auto flex max-w-164 flex-col gap-3 md:flex-row md:gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        getCurrentWeather(search);
        setSearch("");
        setSearchedCity([]);
      }}
    >
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div
          className={
            searchedCity.length > 0
              ? "absolute top-full left-0 z-10 mt-2.5 w-full rounded-xl border border-neutral-600 bg-neutral-800 p-2"
              : "hidden"
          }
        >
          {searchedCity.map((city) => (
            <button
              type="button"
              key={city.id}
              onClick={() => {
                getCurrentWeather(city.name);
                setSearchedCity([]);
                setSearch("");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left hover:bg-neutral-700 cursor-pointer"
            >
              <span>{city.name}</span>

              <span className="text-neutral-300">{city.country}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        className="h-14 rounded-xl bg-blue-500 px-6 text-xl hover:bg-blue-700"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
