import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  return (
    <div className="mx-auto max-w-304 px-4 py-6 md:px-6 lg:py-12">
      <Header />

      <main>
        <h1 className="mt-12 text-center font-display text-[52px] font-bold md:mt-16">
          How’s the sky looking today?
        </h1>

        <div className="mt-12 md:mt-16">
          <SearchBar />
        </div>

        <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-[1fr_384px]">
          {/* Left side */}
          <div>
            <CurrentWeather />
            <WeatherStats />
            <DailyForecast />
          </div>

          {/* Right side */}
          <HourlyForecast />
        </div>
      </main>
    </div>
  );
}

export default App;
