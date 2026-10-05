# Weather App

A responsive weather dashboard built with React, TypeScript and Tailwind CSS. Search for any city in the world to see current conditions, a 7-day forecast and an hour-by-hour breakdown, all powered by the free [Open-Meteo](https://open-meteo.com/) API. No API key is required.

## Features

- **Current weather**: temperature, weather icon, location and date
- **Weather stats**: feels-like temperature, humidity, wind speed and precipitation
- **7-day forecast**: daily high and low temperatures with weather icons
- **Hourly forecast**: pick any day of the week from a dropdown; for today, only the remaining hours are shown
- **City search with suggestions**: live suggestions appear as you type (debounced to avoid unnecessary requests)
- **Unit switching**: Celsius/Fahrenheit, km/h/mph and millimeters/inches, switchable individually or all at once (Metric ↔ Imperial)
- **Saved preferences**: unit choices are stored in `localStorage` and restored on the next visit
- **Loading, empty and error states**: skeleton placeholders while data loads, a "no results" message for unknown cities, and an error screen with a retry button if the API is unreachable
- **Responsive layout**: works on mobile, tablet and desktop

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite](https://vite.dev/) | Dev server and build tool |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [Day.js](https://day.js.org/) | Date formatting and comparison |
| [Open-Meteo API](https://open-meteo.com/) | Geocoding and weather data |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm

### Installation

```bash
git clone <repository-url>
cd weather-app
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── api/
│   └── weather.ts              # Open-Meteo requests and weather-code → icon mapping
├── components/
│   ├── CurrentWeather.tsx      # Main card: location, date, temperature
│   ├── WeatherStats.tsx        # Feels like, humidity, wind, precipitation
│   ├── DailyForecast.tsx       # 7-day forecast grid
│   ├── HourlyForecast.tsx      # Hourly list with day picker
│   ├── SearchBar.tsx           # Search input with live suggestions
│   ├── UnitsDropdown.tsx       # Unit selection menu
│   ├── Header.tsx
│   ├── ErrorState.tsx          # API error screen with retry
│   ├── NoResults.tsx           # Shown when a city is not found
│   └── functions/
│       └── weatherFunctions.ts # Unit conversions and localStorage helpers
├── context/
│   └── WeatherContext.tsx      # Global state and data fetching
├── App.tsx
└── main.tsx
```

## How It Works

1. **Search**: the city name is sent to the Open-Meteo Geocoding API, which returns its coordinates.
2. **Fetch**: those coordinates are used to request current, hourly and daily weather from the Forecast API. Times are returned in the searched city's local time zone.
3. **State**: all weather data, units, loading and error status live in a single React Context (`WeatherContext`), so every component reads from the same source.
4. **Units**: data is always stored in metric units and converted only when displayed, so switching units is instant and never requires a new request.

On first load, the app shows the weather for **Tbilisi**.

## Data Source

Weather and geocoding data are provided by [Open-Meteo](https://open-meteo.com/) under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.

## Author

**Demetre Berdzenadze**

- GitHub: [@DemetreBerdzenadze7](https://github.com/DemetreBerdzenadze7)
