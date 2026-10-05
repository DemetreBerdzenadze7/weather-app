import { getWeatherIcon } from "../api/weather";
import { useWeather } from "../context/WeatherContext";

function DailyForecast() {
  const { dailyForecast } = useWeather();
  console.log(dailyForecast);
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold">Daily forecast</h3>

      <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-7">
        {dailyForecast.map((item) => (
          <div
            key={item.date}
            className="flex flex-col items-center gap-4 rounded-xl border border-neutral-600 bg-neutral-800 px-2.5 py-4"
          >
            <p className="text-lg">{item.date}</p>
            <img
              src={getWeatherIcon(item.weatherCode)}
              alt=""
              className="size-15"
            />
            <div className="flex w-full justify-between">
              <span>{item.maxTemperature}°</span>
              <span className="text-neutral-200">{item.minTemperature}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;
