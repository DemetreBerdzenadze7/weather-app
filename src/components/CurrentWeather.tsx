import { getWeatherIcon } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import dayjs from "dayjs";

function CurrentWeather() {
  const { currentTemperature, location, weatherCode } = useWeather();
  const date = dayjs().format("dddd MMM D YYYY");

  return (
    <section className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-[20px] bg-[url('/images/bg-today-small.svg')] bg-cover px-6 md:flex-row md:justify-between md:bg-[url('/images/bg-today-large.svg')]">
      {/* Location and date */}
      <div className="text-center md:text-left">
        <h2 className="text-[28px] font-bold">
          {location.city}, {location.country}
        </h2>
        <p className="mt-3 text-lg opacity-80">{date}</p>
      </div>

      {/* Icon and temperature */}
      <div className="flex items-center gap-5">
        {currentTemperature !== null && (
          <img src={getWeatherIcon(weatherCode)} alt="" className="size-30" />
        )}
        <p className="text-8xl font-semibold italic">{currentTemperature}°</p>
      </div>
    </section>
  );
}

export default CurrentWeather;
