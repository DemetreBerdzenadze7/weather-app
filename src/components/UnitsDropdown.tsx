import { useState } from "react";

function UnitsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-lg bg-neutral-800 px-4 py-3 hover:bg-neutral-700"
      >
        <img src="/images/icon-units.svg" alt="" />
        Units
        <img src="/images/icon-dropdown.svg" alt="" />
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2.5 w-54 rounded-xl border border-neutral-600 bg-neutral-800 p-2">
          <button className="w-full rounded-lg px-2 py-2.5 text-left hover:bg-neutral-700">
            Switch to Imperial
          </button>

          <p className="px-2 pt-2 text-sm text-neutral-300">Temperature</p>
          <MenuItem text="Celsius (°C)" selected />
          <MenuItem text="Fahrenheit (°F)" />

          <hr className="my-1 border-neutral-600" />

          <p className="px-2 pt-2 text-sm text-neutral-300">Wind Speed</p>
          <MenuItem text="km/h" selected />
          <MenuItem text="mph" />

          <hr className="my-1 border-neutral-600" />

          <p className="px-2 pt-2 text-sm text-neutral-300">Precipitation</p>
          <MenuItem text="Millimeters (mm)" selected />
          <MenuItem text="Inches (in)" />
        </div>
      )}
    </div>
  );
}

function MenuItem({ text, selected = false }: { text: string; selected?: boolean }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 ${
        selected ? "bg-neutral-700" : ""
      }`}
    >
      {text}
      {selected && <img src="/images/icon-checkmark.svg" alt="" />}
    </button>
  );
}

export default UnitsDropdown;
