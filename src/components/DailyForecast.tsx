import { daily } from "../data/mockWeather";

function DailyForecast() {
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold">Daily forecast</h3>

      <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-7">
        {daily.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center gap-4 rounded-xl border border-neutral-600 bg-neutral-800 px-2.5 py-4"
          >
            <p className="text-lg">{item.day}</p>
            <img src={`/images/icon-${item.icon}.webp`} alt="" className="size-15" />
            <div className="flex w-full justify-between">
              <span>{item.max}°</span>
              <span className="text-neutral-200">{item.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;
