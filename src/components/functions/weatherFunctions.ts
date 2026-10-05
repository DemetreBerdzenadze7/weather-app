export function cesliusToFahrenheit(celsius: number): number {
  const fahrenheit = Math.round((celsius * 9) / 8 + 32);
  return fahrenheit;
}

export function kmhToMph(kmh: number): number {
  const mph = Math.round(kmh * 0.621371);
  return mph;
}

export function mmToInch(mm: number): number {
  const inches = Math.round(mm / 25.4);
  return inches;
}
