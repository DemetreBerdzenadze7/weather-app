import { getWeatherIcon } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import dayjs from "dayjs";
import { cesliusToFahrenheit } from "./functions/weatherFunctions";

function CurrentWeather() {
  const {
    currentTemperature,
    location,
    weatherCode,
    dailyForecast,
    selectTemp,
    isLoading,
  } = useWeather();

  if (isLoading) {
    return (
      <section className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-[20px] bg-neutral-800">
        <img
          src="/images/icon-loading.svg"
          alt=""
          className="size-10 animate-spin"
        />
        <p className="text-lg text-neutral-200">Loading...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-72 flex-col items-center justify-center gap-4 overflow-hidden rounded-[20px] bg-[url('/images/bg-today-small.svg')] bg-cover bg-center px-4 py-10 sm:px-6 md:flex-row md:justify-between md:bg-[url('/images/bg-today-large.svg')]">
      {/* Location and date */}
      <div className="w-full min-w-0 text-center md:w-auto md:text-left">
        <h2 className="text-2xl font-bold break-words sm:text-[28px]">
          {location.city === location.country
            ? location.country
            : `${location.city}, ${location.country}`}
        </h2>
        <p className="mt-3 text-base opacity-80 sm:text-lg">
          {dayjs(dailyForecast[0]?.date).format("ddd MMM D YYYY")}
        </p>
      </div>

      {/* Icon and temperature */}
      <div className="flex items-center gap-3 sm:gap-5">
        {currentTemperature !== null && (
          <img src={getWeatherIcon(weatherCode)} alt="" className="size-24 shrink-0 sm:size-30" />
        )}
        <p className="text-7xl font-semibold whitespace-nowrap italic sm:text-8xl">
          {selectTemp === "fahrenheit" && currentTemperature
            ? cesliusToFahrenheit(currentTemperature)
            : currentTemperature}
          °
        </p>
      </div>
    </section>
  );
}

export default CurrentWeather;
