import dayjs from "dayjs";
import { getWeatherIcon } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import { cesliusToFahrenheit } from "./functions/weatherFunctions";

function DailyForecast() {
  const { selectTemp } = useWeather();
  const { dailyForecast, isLoading } = useWeather();
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold">Daily forecast</h3>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-7">
        {isLoading &&
          Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-xl border border-neutral-600 bg-neutral-800"
            />
          ))}

        {!isLoading &&
          dailyForecast.map((item) => (
            <div
              key={item.date}
              className="flex flex-col items-center gap-4 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4"
            >
              <p className="text-lg">{dayjs(item.date).format("dddd")}</p>
              <img
                src={getWeatherIcon(item.weatherCode)}
                alt=""
                className="size-15"
              />
              <div className="flex w-full justify-between">
                <span>
                  {selectTemp === "fahrenheit"
                    ? cesliusToFahrenheit(item.maxTemperature)
                    : item.maxTemperature}
                  °
                </span>
                <span className="text-neutral-200">
                  {selectTemp === "fahrenheit"
                    ? cesliusToFahrenheit(item.minTemperature)
                    : item.minTemperature}
                  °
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default DailyForecast;
