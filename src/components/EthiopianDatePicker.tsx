import React, { useState, useRef, useEffect } from "react";
import {
  isSameDay,
  isToday,
  addDays,
  subDays,
  eachDayOfInterval,
} from "date-fns";
import {
  toEthiopian,
  toGregorian,
  formatEthiopianDate,
  ETHIOPIAN_MONTHS,
  ETHIOPIAN_DAYS_SHORT,
  getMonthStartDay,
  type EtDate,
} from "../utils/ethiopianDateUtils";

export interface EthiopianDatePickerProps {
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const EthiopianDatePicker: React.FC<EthiopianDatePickerProps> = ({
  selectedDate,
  onDateChange,
  placeholder = "Select Ethiopian date...",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentEthiopianMonth, setCurrentEthiopianMonth] = useState<EtDate>(
    toEthiopian(new Date())
  );
  const [selectedDateState, setSelectedDateState] = useState<Date | null>(
    selectedDate || null
  );
  const popoverRef = useRef<HTMLDivElement>(null);

  // Update internal state when prop changes
  useEffect(() => {
    setSelectedDateState(selectedDate || null);
    if (selectedDate) {
      setCurrentEthiopianMonth(toEthiopian(selectedDate));
    }
  }, [selectedDate]);

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getCalendarDays = (): Date[] => {
    // Get the first day of the Ethiopian month
    const firstDayOfEthiopianMonth = toGregorian({
      Day: 1,
      Month: currentEthiopianMonth.Month,
      Year: currentEthiopianMonth.Year,
    });

    // Get the day of week for the first day (1 = Monday, 7 = Sunday)
    const firstDayOfWeek = getMonthStartDay(
      currentEthiopianMonth.Month,
      currentEthiopianMonth.Year
    );

    // Calculate the Gregorian date for the first day of the calendar grid
    const calendarStart = subDays(firstDayOfEthiopianMonth, firstDayOfWeek - 1);

    // Calculate the last day of the calendar grid (6 weeks * 7 days)
    const calendarEnd = addDays(calendarStart, 41); // 6 weeks - 1 day

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDateState(date);
    setIsOpen(false);
    onDateChange?.(date);
  };

  const handlePreviousMonth = () => {
    const newMonth =
      currentEthiopianMonth.Month === 1 ? 13 : currentEthiopianMonth.Month - 1;
    const newYear =
      currentEthiopianMonth.Month === 1
        ? currentEthiopianMonth.Year - 1
        : currentEthiopianMonth.Year;
    setCurrentEthiopianMonth({ Day: 1, Month: newMonth, Year: newYear });
  };

  const handleNextMonth = () => {
    const newMonth =
      currentEthiopianMonth.Month === 13 ? 1 : currentEthiopianMonth.Month + 1;
    const newYear =
      currentEthiopianMonth.Month === 13
        ? currentEthiopianMonth.Year + 1
        : currentEthiopianMonth.Year;
    setCurrentEthiopianMonth({ Day: 1, Month: newMonth, Year: newYear });
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDateState(today);
    setCurrentEthiopianMonth(toEthiopian(today));
    setIsOpen(false);
    onDateChange?.(today);
  };

  const handleClear = () => {
    setSelectedDateState(null);
    setIsOpen(false);
    onDateChange?.(null);
  };

  const calendarDays = getCalendarDays();

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <div
        className={`
          relative cursor-pointer border border-gray-300 rounded-lg px-4 py-2 
          bg-white text-left focus:outline-none focus:ring-2 focus:ring-ethiopian-green 
          focus:border-transparent transition-all duration-200
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-ethiopian-green"
          }
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span
            className={`font-amharic ${
              selectedDateState ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {selectedDateState
              ? formatEthiopianDate(selectedDateState, "long")
              : placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="text-center">
              <div className="font-amharic font-bold text-lg">
                {ETHIOPIAN_MONTHS[currentEthiopianMonth.Month - 1]}
              </div>
              <div className="text-sm opacity-90">
                {currentEthiopianMonth.Year} ዓ.ም
              </div>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Ethiopian Year Display */}
          <div className="mb-4 text-center">
            <span className="inline-block px-3 py-1 bg-ethiopian-yellow text-black font-amharic font-bold text-sm rounded-full">
              {currentEthiopianMonth.Year} ዓ.ም
            </span>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {ETHIOPIAN_DAYS_SHORT.map((day) => (
              <div key={day} className="text-center">
                <span className="text-xs font-bold text-ethiopian-green font-amharic">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const isSelected =
                selectedDateState && isSameDay(day, selectedDateState);
              const ethiopianDay = toEthiopian(day);
              const isCurrentEthiopianMonth =
                ethiopianDay.Month === currentEthiopianMonth.Month &&
                ethiopianDay.Year === currentEthiopianMonth.Year;
              const isTodayDate = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateSelect(day)}
                  className={`
                    w-8 h-8 text-sm rounded-full transition-all duration-200 font-amharic
                    ${
                      isSelected
                        ? "bg-ethiopian-green text-white font-bold"
                        : isTodayDate
                        ? "bg-ethiopian-yellow text-black font-bold"
                        : isCurrentEthiopianMonth
                        ? "hover:bg-gray-100 text-gray-900"
                        : "text-gray-400"
                    }
                    ${!isCurrentEthiopianMonth ? "opacity-50" : ""}
                  `}
                >
                  {ethiopianDay.Day}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleToday}
              className="px-3 py-1 text-sm bg-ethiopian-green text-white rounded hover:bg-green-700 transition-colors font-amharic"
            >
              ዛሬ
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-amharic"
            >
              አጽዳ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthiopianDatePicker;
