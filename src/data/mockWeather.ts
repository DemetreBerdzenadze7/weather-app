// Fake data, only to show the UI.

export const current = {
  location: "Berlin, Germany",
  date: "Tuesday, Aug 5, 2025",
  icon: "sunny",
  temperature: 20,
  feelsLike: 18,
  humidity: 46,
  wind: 14,
  precipitation: 0,
};

export const daily = [
  { day: "Tue", icon: "rain", max: 20, min: 14 },
  { day: "Wed", icon: "drizzle", max: 21, min: 15 },
  { day: "Thu", icon: "sunny", max: 24, min: 14 },
  { day: "Fri", icon: "partly-cloudy", max: 25, min: 13 },
  { day: "Sat", icon: "storm", max: 21, min: 15 },
  { day: "Sun", icon: "snow", max: 25, min: 16 },
  { day: "Mon", icon: "fog", max: 24, min: 15 },
];

export const hourly = [
  { time: "3 PM", icon: "overcast", temp: 20 },
  { time: "4 PM", icon: "partly-cloudy", temp: 20 },
  { time: "5 PM", icon: "sunny", temp: 20 },
  { time: "6 PM", icon: "overcast", temp: 19 },
  { time: "7 PM", icon: "snow", temp: 18 },
  { time: "8 PM", icon: "fog", temp: 18 },
  { time: "9 PM", icon: "snow", temp: 17 },
  { time: "10 PM", icon: "overcast", temp: 17 },
];
