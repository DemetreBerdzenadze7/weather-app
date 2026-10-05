import { useContext, createContext, useState, type ReactNode } from "react";
import { getCoordinates, getWeather } from "../api/weather";

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
}

export interface HourlyForecastItem {
  time: string;
  weatherCode: number;
  temperature: number;
}

interface Location {
  city: string;
  country: string;
}

interface ContextStates {
  currentTemperature: number | null;
  setCurrentTemperature: (value: number | null) => void;

  feelsLike: number | null;
  setFeelsLike: (value: number | null) => void;

  humidity: number | null;
  setHumidity: (value: number | null) => void;

  wind: number | null;
  setWind: (value: number | null) => void;

  precipitation: number | null;
  setPrecipitation: (value: number | null) => void;

  dailyForecast: DailyForecastItem[];
  setDailyForecast: (value: DailyForecastItem[]) => void;

  hourlyForecast: HourlyForecastItem[];
  setHourlyForecast: (value: HourlyForecastItem[]) => void;

  location: Location;
  setLocation: (location: Location) => void;

  weatherCode: number;
  setWeatherCode: (weatherCode: number) => void;

  getCurrentWeather: (place: string) => Promise<void>;

  selectTemp: string;
  setSelectTemp: React.Dispatch<React.SetStateAction<string>>;

  selectSpeed: string;
  setSelectSpeed: React.Dispatch<React.SetStateAction<string>>;

  selectPrecipitation: string;
  setSelectPrecipitation: React.Dispatch<React.SetStateAction<string>>;
}

const WeatherContext = createContext<ContextStates | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null,
  );
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [wind, setWind] = useState<number | null>(null);
  const [precipitation, setPrecipitation] = useState<number | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecastItem[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>(
    [],
  );
  const [location, setLocation] = useState<Location>({ city: "", country: "" });
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [selectTemp, setSelectTemp] = useState<string>("celsius");
  const [selectSpeed, setSelectSpeed] = useState<string>("mk");
  const [selectPrecipitation, setSelectPrecipitation] = useState<string>("mm");

  async function getCurrentWeather(place: string) {
    const location = await getCoordinates(place);
    if (!location) return;

    const weather = await getWeather(location.latitude, location.longitude);

    if (!weather) return;

    setLocation({ city: location.name, country: location.country });
    setCurrentTemperature(weather.current.temperature_2m);
    setFeelsLike(weather.current.apparent_temperature);
    setHumidity(weather.current.relative_humidity_2m);
    setWind(weather.current.wind_speed_10m);
    setPrecipitation(weather.current.precipitation);
    setWeatherCode(weather.current.weather_code);

    setDailyForecast(
      weather.daily.time.map((date: string, i: number) => ({
        date,
        weatherCode: weather.daily.weather_code[i],
        maxTemperature: weather.daily.temperature_2m_max[i],
        minTemperature: weather.daily.temperature_2m_min[i],
      })),
    );

    setHourlyForecast(
      weather.hourly.time.map((time: string, i: number) => ({
        time,
        weatherCode: weather.hourly.weather_code[i],
        temperature: weather.hourly.temperature_2m[i],
      })),
    );
  }
  return (
    <WeatherContext.Provider
      value={{
        currentTemperature,
        setCurrentTemperature,
        feelsLike,
        setFeelsLike,
        humidity,
        setHumidity,
        wind,
        setWind,
        precipitation,
        setPrecipitation,
        dailyForecast,
        setDailyForecast,
        hourlyForecast,
        setHourlyForecast,
        location,
        setLocation,
        weatherCode,
        setWeatherCode,
        getCurrentWeather,
        selectTemp,
        setSelectTemp,
        selectSpeed,
        setSelectSpeed,
        selectPrecipitation,
        setSelectPrecipitation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather must be used inside WeatherProvider");
  return context;
}
