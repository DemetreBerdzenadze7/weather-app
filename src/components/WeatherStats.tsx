import { useWeather } from "../context/WeatherContext";
import {
  cesliusToFahrenheit,
  kmhToMph,
  mmToInch,
} from "./functions/weatherFunctions";

function WeatherStats() {
  const {
    feelsLike,
    humidity,
    wind,
    precipitation,
    selectTemp,
    selectSpeed,
    selectPrecipitation,
    isLoading,
  } = useWeather();

  if (isLoading) {
    return (
      <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <StatCard label="Feels Like" value="–" />
        <StatCard label="Humidity" value="–" />
        <StatCard label="Wind" value="–" />
        <StatCard label="Precipitation" value="–" />
      </section>
    );
  }

  return (
    <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      <StatCard
        label="Feels Like"
        value={`${selectTemp === "fahrenheit" && feelsLike ? cesliusToFahrenheit(feelsLike) : feelsLike}°`}
      />
      <StatCard label="Humidity" value={`${humidity}%`} />
      <StatCard
        label="Wind"
        value={`${selectSpeed === "mp" && wind ? kmhToMph(wind) : wind} ${selectSpeed === "mp" ? "mph" : "km/h"}`}
      />
      <StatCard
        label="Precipitation"
        value={`${selectPrecipitation === "in" && precipitation ? mmToInch(precipitation) : precipitation} ${selectPrecipitation === "in" ? "in" : "mm"}`}
      />
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5">
      <p className="text-lg text-neutral-200">{label}</p>
      <p className="text-[32px] font-light">{value}</p>
    </div>
  );
}

export default WeatherStats;
