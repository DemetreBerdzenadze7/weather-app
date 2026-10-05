import { getWeatherIcon } from "../api/weather";
import { useWeather } from "../context/WeatherContext";

function HourlyForecast() {
  const { hourlyForecast } = useWeather();
  return (
    <section className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 p-6">
      {/* Title and day button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Hourly forecast</h3>
        <button className="flex items-center gap-3 rounded-lg bg-neutral-600 px-4 py-2 hover:bg-neutral-700">
          Tuesday
          <img src="/images/icon-dropdown.svg" alt="" />
        </button>
      </div>

      {/* Hours list — scrolls when it exceeds the max height */}
      <div className="flex max-h-150 flex-col gap-4 overflow-y-auto pr-2">
        {hourlyForecast.slice(0, 23).map((item) => (
          <div
            key={item.time}
            className="flex h-15 shrink-0 items-center gap-2 rounded-lg border border-neutral-600 bg-neutral-700 pr-4 pl-3"
          >
            <img
              src={getWeatherIcon(item.weatherCode)}
              alt=""
              className="size-10"
            />
            <p className="flex-1 text-xl font-medium">{item.time}</p>
            <p>{item.temperature}°</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
