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
    <section className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-[20px] bg-[url('/images/bg-today-small.svg')] bg-cover px-6 md:flex-row md:justify-between md:bg-[url('/images/bg-today-large.svg')]">
      {/* Location and date */}
      <div className="text-center md:text-left">
        <h2 className="text-[28px] font-bold">
          {location.city === location.country
            ? location.country
            : `${location.city}, ${location.country}`}
        </h2>
        <p className="mt-3 text-lg opacity-80">
          {dayjs(dailyForecast[0]?.date).format("ddd MMM D YYYY")}
        </p>
      </div>

      {/* Icon and temperature */}
      <div className="flex items-center gap-5">
        {currentTemperature !== null && (
          <img src={getWeatherIcon(weatherCode)} alt="" className="size-30" />
        )}
        <p className="text-8xl font-semibold italic">
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
