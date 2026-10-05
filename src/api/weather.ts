export async function getCoordinates(place: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("failed");

    const data = await response.json();

    if (!data.results) return null;
    return data.results[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("failed");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getWeatherIcon(code: number): string {
  if (code === 0) return "/images/icon-sunny.webp";
  if (code === 1 || code === 2) return "/images/icon-partly-cloudy.webp";
  if (code === 3) return "/images/icon-overcast.webp";
  if (code === 45 || code === 48) return "/images/icon-fog.webp";
  if (code >= 51 && code <= 57) return "/images/icon-drizzle.webp";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
    return "/images/icon-rain.webp";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return "/images/icon-snow.webp";
  if (code >= 95) return "/images/icon-storm.webp";
  return "/images/icon-sunny.webp";
}
