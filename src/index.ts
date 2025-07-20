// Import styles
import "./styles.css";

// Main component export
export { default as EthiopianDatePicker } from "./components/EthiopianDatePicker";

// Utility functions
export {
  toEthiopian,
  toGregorian,
  formatEthiopianDate,
  isValidEthiopianDate,
  isEthiopianLeapYear,
  getEthiopianMonthName,
  getEthiopianDayName,
  getCurrentEthiopianDate,
  addYearsToEthiopianDate,
  addDaysToEthiopianDate,
  compareEthiopianDates,
  createEthiopianDateFromParts,
  dateConverter,
  EthiopianDateConverter,
  EthiopianDate,
  type EtDate,
  type DateType,
} from "./utils/ethiopianDateUtils";

// Legacy function names for backward compatibility
export {
  gregorianToEthiopian,
  ethiopianToGregorian,
} from "./utils/ethiopianDateUtils";

// Re-export types
export type { EthiopianDatePickerProps } from "./components/EthiopianDatePicker";
