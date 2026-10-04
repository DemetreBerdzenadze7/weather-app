import { useState } from "react";
import { getCoordinates, getWeather } from "../api/weather";
import { useWeather } from "../context/WeatherContext";

function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const {
    setCurrentTemperature,
    setFeelsLike,
    setHumidity,
    setWind,
    setPrecipitation,
    setDailyForecast,
    setHourlyForecast,
  } = useWeather();

  const getW = async (place: string) => {
    const location = await getCoordinates(place);
    if (!location) return;

    const weather = await getWeather(location.latitude, location.longitude);

    if (!weather) {
      return;
    } else {
      setCurrentTemperature(weather.current.temperature_2m);
      setFeelsLike(weather.current.apparent_temperature);
      setHumidity(weather.current.relative_humidity_2m);
      setWind(weather.current.wind_speed_10m);
      setPrecipitation(weather.current.precipitation);

      setDailyForecast(
        weather.daily.time.map((date: string, i: number) => ({
          date,
          weatherCode: weather.daily.weather_code[i],
          maxTemperature: weather.daily.temperature_2m_max[i],
          minTemperature: weather.daily.temperature_2m_min[i],
        })),
      );

      setHourlyForecast(
        weather.hourly.time.map((time: string, i: number) => ({
          time,
          weatherCode: weather.hourly.weather_code[i],
          temperature: weather.hourly.temperature_2m[i],
        })),
      );
    }
  };
  return (
    <form
      className="mx-auto flex max-w-164 flex-col gap-3 md:flex-row md:gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        getW(search);
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
