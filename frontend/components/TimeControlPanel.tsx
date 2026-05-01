import { useState } from "react";

const timeControls = [
  { label: "Bullet 1 min", value: "1|0" },
  { label: "Blitz 3 | 2", value: "3|2" },
  { label: "Blitz 5 min", value: "5|0" },
  { label: "Rapid 10 min", value: "10|0" },
  { label: "Rapid 10 | 5", value: "10|5" },
];

export default function TimeControlDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(timeControls[2]); // default

  return (
    <div className="relative w-48">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
      >
        {selected.label}
        <span>▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          {timeControls.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer transition"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}