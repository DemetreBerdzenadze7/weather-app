import { useState } from "react";
import dayjs from "dayjs";
import { getWeatherIcon } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import { cesliusToFahrenheit } from "./functions/weatherFunctions";

function HourlyForecast() {
  const { hourlyForecast, dailyForecast, selectTemp, isLoading } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const currentDate = dayjs();

  const selectedDate = dailyForecast[selectedDayIndex]?.date;
  const selectedDayHours = hourlyForecast.filter((item) =>
    selectedDayIndex === 0
      ? !dayjs(item.time).isBefore(currentDate, "hour") &&
        item.time.startsWith(selectedDate)
      : item.time.startsWith(selectedDate),
  );

  return (
    <section className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 p-6">
      {/* Title and day button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Hourly forecast</h3>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-lg bg-neutral-600 px-4 py-2 hover:bg-neutral-700 cursor-pointer"
          >
            {selectedDate ? dayjs(selectedDate).format("dddd") : "–"}
            <img src="/images/icon-dropdown.svg" alt="" />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 z-10 mt-2.5 w-54 rounded-xl border border-neutral-600 bg-neutral-800 p-2">
              {dailyForecast.map((day, i) => (
                <button
                  key={day.date}
                  onClick={() => {
                    setSelectedDayIndex(i);
                    setIsOpen(false);
                  }}
                  className={`w-full rounded-lg px-2 py-2.5 text-left hover:bg-neutral-700 cursor-pointer ${
                    i === selectedDayIndex ? "bg-neutral-700" : ""
                  }`}
                >
                  {dayjs(day.date).format("dddd")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hours list — scrolls when it exceeds the max height */}
      <div className="flex max-h-150 flex-col gap-4 overflow-y-auto pr-2">
        {isLoading &&
          Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-15 shrink-0 animate-pulse rounded-lg border border-neutral-600 bg-neutral-700"
            />
          ))}

        {!isLoading &&
          selectedDayHours.map((item) => (
            <div
              key={item.time}
              className="flex h-15 shrink-0 items-center gap-2 rounded-lg border border-neutral-600 bg-neutral-700 pr-4 pl-3"
            >
              <img
                src={getWeatherIcon(item.weatherCode)}
                alt=""
                className="size-10"
              />
              <p className="flex-1 text-xl font-medium">
                {dayjs(item.time).format("h A")}
              </p>
              <p>
                {selectTemp === "fahrenheit"
                  ? cesliusToFahrenheit(item.temperature)
                  : item.temperature}
                °
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
