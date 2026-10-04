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
