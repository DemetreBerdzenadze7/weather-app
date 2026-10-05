import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { saveToLocaleStorage } from "./functions/weatherFunctions";

function UnitsDropdown() {
  const {
    selectTemp,
    setSelectTemp,
    selectSpeed,
    setSelectSpeed,
    selectPrecipitation,
    setSelectPrecipitation,
  } = useWeather();
  const [isOpen, setIsOpen] = useState(false);

  const isImperial =
    selectTemp === "fahrenheit" &&
    selectSpeed === "mp" &&
    selectPrecipitation === "in";

  useEffect(() => {
    saveToLocaleStorage({
      temperature: selectTemp,
      speed: selectSpeed,
      precipitation: selectPrecipitation,
    });
  }, [selectPrecipitation, selectSpeed, selectTemp]);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-lg bg-neutral-800 px-4 py-3 hover:bg-neutral-700 cursor-pointer"
      >
        <img src="/images/icon-units.svg" alt="" />
        Units
        <img src="/images/icon-dropdown.svg" alt="" />
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2.5 w-54 rounded-xl border border-neutral-600 bg-neutral-800 p-2">
          <button
            className="w-full rounded-lg px-2 py-2.5 text-left hover:bg-neutral-700 cursor-pointer"
            onClick={() => {
              if (isImperial) {
                setSelectTemp("celsius");
                setSelectSpeed("mk");
                setSelectPrecipitation("mm");
              } else {
                setSelectTemp("fahrenheit");
                setSelectSpeed("mp");
                setSelectPrecipitation("in");
              }
            }}
          >
            {isImperial ? "Switch to Metric" : "Switch to Imperial"}
          </button>

          <p className="px-2 pt-2 text-sm text-neutral-300">Temperature</p>
          <MenuItem
            text="Celsius (°C)"
            onClick={() => {
              setSelectTemp("celsius");
            }}
            selected={selectTemp === "celsius"}
          />
          <MenuItem
            text="Fahrenheit (°F)"
            onClick={() => setSelectTemp("fahrenheit")}
            selected={selectTemp === "fahrenheit"}
          />

          <hr className="my-1 border-neutral-600" />

          <p className="px-2 pt-2 text-sm text-neutral-300">Wind Speed</p>
          <MenuItem
            text="km/h"
            onClick={() => setSelectSpeed("mk")}
            selected={selectSpeed === "mk"}
          />
          <MenuItem
            text="mph"
            onClick={() => setSelectSpeed("mp")}
            selected={selectSpeed === "mp"}
          />

          <hr className="my-1 border-neutral-600" />

          <p className="px-2 pt-2 text-sm text-neutral-300">Precipitation</p>
          <MenuItem
            text="Millimeters (mm)"
            onClick={() => setSelectPrecipitation("mm")}
            selected={selectPrecipitation === "mm"}
          />
          <MenuItem
            text="Inches (in)"
            onClick={() => setSelectPrecipitation("in")}
            selected={selectPrecipitation === "in"}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  text,
  selected = false,
  onClick,
}: {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 cursor-pointer ${
        selected ? "bg-neutral-700" : ""
      }`}
      onClick={onClick}
    >
      {text}
      {selected && <img src="/images/icon-checkmark.svg" alt="" />}
    </button>
  );
}

export default UnitsDropdown;
