import { useState, useRef, useEffect } from "react";

export default function MultiSelect({
  options = [],
  placeholder = "Select Options",
  onChange,
  multiSelect = true, // enable multi-select by default
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(multiSelect ? [] : null);
  const dropdownRef = useRef();

  useEffect(() => {
    if (multiSelect) {
      if (!Array.isArray(selected)) {
        setSelected(selected ? [selected] : []);
      }
    } else {
      if (Array.isArray(selected)) {
        setSelected(selected.length > 0 ? selected[selected.length - 1] : null);
      }
    }
  }, [multiSelect]);

  const handleSelect = (value) => {
    if (multiSelect) {
      const newSelected = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      setSelected(newSelected);
      if (onChange) onChange(newSelected);
    } else {
      setSelected(value);
      if (onChange) onChange(value);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full font-arialrounded text-gray-500"
      ref={dropdownRef}
    >
      {/* Trigger */}
      <div
        className="bg-white border border-gray-300 rounded-xl px-3 py-3 cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {multiSelect
          ? selected.length > 0
            ? selected[selected.length - 1] // only show last selected
            : placeholder
          : selected || placeholder}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-md max-h-60 overflow-auto p-2 ">
          {options.map((option) => {
            const isChecked = multiSelect
              ? selected.includes(option)
              : selected === option;

            return (
              <label
                key={option}
                className={`flex items-center p-1 cursor-pointer select-none 
                  ${isChecked ? "bg-black text-white" : "bg-white text-black"}
                  rounded-md
                  mb-1
                  `}
              >
                <input
                  type={multiSelect ? "checkbox" : "radio"}
                  name="multi-select-group"
                  value={option}
                  checked={isChecked}
                  onChange={() => handleSelect(option)}
                  className="hidden"
                />
                {/* Custom square checkbox */}
                <span
                  className={`inline-block w-5 h-5 mr-2 border-2 rounded-sm 
                    ${
                      isChecked
                        ? "bg-white border-white"
                        : "bg-white border-black"
                    }`}
                  style={{
                    backgroundColor: isChecked ? "black" : "white",
                    borderColor: isChecked ? "black" : "black",
                  }}
                >
                  {isChecked && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
