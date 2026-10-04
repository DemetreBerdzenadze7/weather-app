import { current } from "../data/mockWeather";

function WeatherStats() {
  return (
    <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      <StatCard label="Feels Like" value={`${current.feelsLike}°`} />
      <StatCard label="Humidity" value={`${current.humidity}%`} />
      <StatCard label="Wind" value={`${current.wind} km/h`} />
      <StatCard label="Precipitation" value={`${current.precipitation} mm`} />
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
