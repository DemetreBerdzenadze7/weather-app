import { current } from "../data/mockWeather";

function CurrentWeather() {
  return (
    <section className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-[20px] bg-[url('/images/bg-today-small.svg')] bg-cover px-6 md:flex-row md:justify-between md:bg-[url('/images/bg-today-large.svg')]">
      {/* Location and date */}
      <div className="text-center md:text-left">
        <h2 className="text-[28px] font-bold">{current.location}</h2>
        <p className="mt-3 text-lg opacity-80">{current.date}</p>
      </div>

      {/* Icon and temperature */}
      <div className="flex items-center gap-5">
        <img src={`/images/icon-${current.icon}.webp`} alt="" className="size-30" />
        <p className="text-8xl font-semibold italic">{current.temperature}°</p>
      </div>
    </section>
  );
}

export default CurrentWeather;
