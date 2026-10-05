import { useContext, createContext, useState, type ReactNode } from "react";

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
