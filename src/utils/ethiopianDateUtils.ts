/**
 * Ethiopian Date Utilities
 *
 * This module provides comprehensive Ethiopian calendar functionality including:
 * - Ethiopian to Gregorian date conversion
 * - Gregorian to Ethiopian date conversion
 * - Date formatting in Amharic and English
 * - Calendar calculations and validations
 * - Ethiopian date manipulation utilities
 *
 * Based on the Ethiopian calendar system which has 13 months:
 * - 12 months of 30 days each
 * - 1 month (Pagume) of 5-6 days (leap year adjustment)
 *
 * @author Ethiopian Date Picker Team
 * @version 1.0.0
 */

// Calendar type definitions
export type DateType = "EN" | "AMH";

// Ethiopian calendar constants
export const ETHIOPIAN_CALENDAR_OFFSET = 2431; // Days between Ethiopian and Gregorian calendars (Ethiopian is ~7-8 years behind)
export const ETHIOPIAN_DAYS_IN_MONTH = 30; // Standard Ethiopian month length (all months except Pagume)
export const ETHIOPIAN_LEAP_YEAR_DAYS = 6; // Days in Ethiopian leap year (Pagume month)
export const ETHIOPIAN_NORMAL_YEAR_DAYS = 5; // Days in Ethiopian normal year (Pagume month)

// Ethiopian month names (Amharic) - 13 months total
// Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit, Miyaziya, Ginbot, Sene, Hamle, Nehase, Pagume
export const ETHIOPIAN_MONTHS: readonly string[] = [
  "መስከረም", // September 11 - October 10
  "ጥቅምት", // October 11 - November 9
  "ህዳር", // November 10 - December 9
  "ታህሳስ", // December 10 - January 8
  "ጥር", // January 9 - February 7
  "የካቲት", // February 8 - March 9
  "መጋቢት", // March 10 - April 8
  "ሚያዚያ", // April 9 - May 8
  "ግንቦት", // May 9 - June 7
  "ሰኔ", // June 8 - July 7
  "ሐምሌ", // July 8 - August 6
  "ነሀሴ", // August 7 - September 5
  "ጳጉሜ", // September 6 - September 10 (5-6 days)
] as const;

// Ethiopian month names (English) - 13 months total
// Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit, Miyaziya, Ginbot, Sene, Hamle, Nehase, Pagume
export const ETHIOPIAN_MONTHS_EN: readonly string[] = [
  "Meskerem", // September 11 - October 10
  "Tikimt", // October 11 - November 9
  "Hidar", // November 10 - December 9
  "Tahsas", // December 10 - January 8
  "Tir", // January 9 - February 7
  "Yekatit", // February 8 - March 9
  "Megabit", // March 10 - April 8
  "Miyaziya", // April 9 - May 8
  "Ginbot", // May 9 - June 7
  "Sene", // June 8 - July 7
  "Hamle", // July 8 - August 6
  "Nehase", // August 7 - September 5
  "Pagume", // September 6 - September 10 (5-6 days)
] as const;

// Ethiopian day names (Amharic) - Monday to Sunday
// Segno, Maksegno, Robue, Hamus, Arb, Kidame, Ihud
export const ETHIOPIAN_DAYS: readonly string[] = [
  "ሰኞ",
  "ማክሰኞ",
  "ረቡዕ",
  "ሐሙስ",
  "ዓርብ",
  "ቅዳሜ",
  "እሁድ",
] as const;

// Ethiopian short day names (Amharic) - Abbreviated versions
export const ETHIOPIAN_DAYS_SHORT: readonly string[] = [
  "ሰ",
  "ማ",
  "ረ",
  "ሐ",
  "ዓ",
  "ቅ",
  "እ",
] as const;

// English month names (standard Gregorian months) - 12 months total
// Used for English locale display and conversion mapping
export const ENGLISH_MONTHS: readonly string[] = [
  "January", // 1st month
  "February", // 2nd month (leap year adjustment)
  "March", // 3rd month
  "April", // 4th month
  "May", // 5th month
  "June", // 6th month
  "July", // 7th month
  "August", // 8th month
  "September", // 9th month (corresponds to Ethiopian Pagume)
  "October", // 10th month
  "November", // 11th month
  "December", // 12th month
] as const;

// English day names - Monday to Sunday
// Used for English locale display
export const ENGLISH_DAYS: readonly string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// English short day names - Abbreviated versions
// Used for compact calendar display
export const ENGLISH_DAYS_SHORT: readonly string[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

/**
 * Ethiopian Date Interface
 *
 * Defines the structure for Ethiopian date objects with day, month, and year.
 * All properties are 1-indexed (day 1-30, month 1-13, year 1+).
 */
export interface EtDate {
  Day: number; // Day of month (1-30, or 1-5/6 for Pagume)
  Month: number; // Month of year (1-13, where 13 is Pagume)
  Year: number; // Ethiopian year (1+)
}

/**
 * Ethiopian Date Class
 *
 * Represents an Ethiopian date with conversion and formatting capabilities.
 * Implements the EtDate interface and provides utility methods.
 */
export class EthiopianDate implements EtDate {
  constructor(public Day: number, public Month: number, public Year: number) {}

  /**
   * Convert Ethiopian date to Amharic string format
   * @returns Formatted string like "15 መስከረም 2016"
   */
  toString(): string {
    return `${this.Day} ${ETHIOPIAN_MONTHS[this.Month - 1]} ${this.Year}`;
  }

  /**
   * Convert Ethiopian date to short numeric format
   * @returns Formatted string like "15/1/2016"
   */
  toShortString(): string {
    return `${this.Day}/${this.Month}/${this.Year}`;
  }
}

/**
 * Check if Ethiopian year is a leap year
 *
 * Ethiopian leap years follow a 4-year cycle where years ending in 3 are leap years.
 * This is different from the Gregorian calendar leap year rules.
 *
 * @param year - Ethiopian year to check
 * @returns true if the year is a leap year, false otherwise
 *
 * @example
 * isEthiopianLeapYear(2015) // false
 * isEthiopianLeapYear(2016) // false
 * isEthiopianLeapYear(2017) // false
 * isEthiopianLeapYear(2018) // false
 * isEthiopianLeapYear(2019) // true (leap year)
 */
export function isEthiopianLeapYear(year: number): boolean {
  return year % 4 === 3;
}

// Legacy function name for backward compatibility
export const isLeapYearEt = isEthiopianLeapYear;

/**
 * Get the number of days in an Ethiopian month
 *
 * Ethiopian months have 30 days each, except for the 13th month (Pagume)
 * which has 5 days in normal years and 6 days in leap years.
 *
 * @param month - Ethiopian month (1-13)
 * @param year - Ethiopian year (for leap year calculation of Pagume)
 * @returns Number of days in the specified month
 *
 * @example
 * ethiopianMonthLength(1, 2016) // 30 (Meskerem)
 * ethiopianMonthLength(13, 2016) // 5 (Pagume in normal year)
 * ethiopianMonthLength(13, 2019) // 6 (Pagume in leap year)
 */
export function getEthiopianMonthLength(month: number, year: number): number {
  if (month === 13) {
    return isEthiopianLeapYear(year)
      ? ETHIOPIAN_LEAP_YEAR_DAYS
      : ETHIOPIAN_NORMAL_YEAR_DAYS;
  }
  return ETHIOPIAN_DAYS_IN_MONTH;
}

// Legacy function name for backward compatibility
export const ethiopianMonthLength = getEthiopianMonthLength;

/**
 * Check if Gregorian year is a leap year
 *
 * Gregorian leap year rules:
 * - Year must be divisible by 4
 * - If year is divisible by 100, it must also be divisible by 400
 *
 * @param year - Gregorian year to check
 * @returns true if the year is a leap year, false otherwise
 *
 * @example
 * isLeapYearGr(2020) // true
 * isLeapYearGr(2021) // false
 * isLeapYearGr(2100) // false (divisible by 100 but not 400)
 * isLeapYearGr(2000) // true (divisible by both 100 and 400)
 */
function isLeapYearGr(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Get the day number from an Ethiopian date
 *
 * Converts an Ethiopian date to a sequential day number starting from
 * the Ethiopian calendar epoch. This is used for date calculations and conversions.
 *
 * @param ethiopianDate - Ethiopian date object
 * @returns Sequential day number from Ethiopian calendar epoch
 *
 * @example
 * getEthiopianDayNumber({Day: 1, Month: 1, Year: 1}) // 0
 * getEthiopianDayNumber({Day: 1, Month: 1, Year: 2016}) // 735,965
 */
export function getDayNumber(ethiopianDate: EtDate): number {
  const leapYearCycles = Math.floor(ethiopianDate.Year / 4);
  const remainingYears = ethiopianDate.Year % 4;
  return (
    leapYearCycles * 1461 +
    remainingYears * 365 +
    (ethiopianDate.Month - 1) * ETHIOPIAN_DAYS_IN_MONTH +
    ethiopianDate.Day -
    1
  );
}

// Legacy function name for backward compatibility
export const getDayNoEthiopian = getDayNumber;
export const getEthiopianDayNumber = getDayNumber;

/**
 * Get the number of days in a Gregorian month
 *
 * Returns the number of days in the specified Gregorian month,
 * accounting for leap years in February.
 *
 * @param index - Gregorian month (1-12)
 * @param year - Gregorian year (for leap year calculation)
 * @returns Number of days in the specified month
 *
 * @example
 * getGregorianMonthLength(1, 2020) // 31 (January)
 * getGregorianMonthLength(2, 2020) // 29 (February in leap year)
 * getGregorianMonthLength(2, 2021) // 28 (February in normal year)
 * getGregorianMonthLength(4, 2020) // 30 (April)
 */
function getGregorianMonthLength(index: number, year: number): number {
  switch (index) {
    case 1: // January
    case 3: // March
    case 5: // May
    case 7: // July
    case 8: // August
    case 10: // October
    case 12: // December
      return 31;
    case 2: // February
      return isLeapYearGr(year) ? 29 : 28;
    default:
      return 30; // April, June, September, November
  }
}

/**
 * Get the day of week for the first day of an Ethiopian month
 *
 * Calculates which day of the week (1=Monday, 7=Sunday) the first day
 * of the specified Ethiopian month falls on.
 *
 * @param month - Ethiopian month (1-13)
 * @param year - Ethiopian year
 * @returns Day of week (1=Monday, 2=Tuesday, ..., 7=Sunday)
 *
 * @example
 * getEthiopianMonthStartDayOfWeek(1, 2016) // 4 (Thursday)
 * getEthiopianMonthStartDayOfWeek(13, 2016) // 2 (Tuesday)
 */
export function getMonthStartDay(month: number, year: number): number {
  const gregorianDate = toGregorian({ Day: 1, Month: month, Year: year });
  return ((gregorianDate.getUTCDay() || 7) % 7) + 1;
}

// Legacy function name for backward compatibility
export const getEtMonthStartDate = getMonthStartDay;
export const getEthiopianMonthStartDayOfWeek = getMonthStartDay;

/**
 * Convert a day number to a Gregorian date
 *
 * Converts a sequential day number (from Gregorian calendar epoch) to a
 * Gregorian date object. This is the inverse of getDayNoGregorian().
 *
 * The algorithm handles the complex Gregorian calendar rules including:
 * - 400-year cycles (146,097 days)
 * - 100-year cycles (36,524 days, but only 3 per 400-year cycle)
 * - 4-year cycles (1,461 days)
 * - Individual years (365 days, but only 3 per 4-year cycle)
 *
 * @param dayNumber - Sequential day number from Gregorian calendar epoch
 * @returns Gregorian Date object
 *
 * @example
 * gregorianDateFromDayNo(0) // Date(1, 0, 1) - January 1, 1 AD
 * gregorianDateFromDayNo(737790) // Date(2020, 0, 1) - January 1, 2020
 */
export function gregorianDateFromDayNo(dayNumber: number): Date {
  let year = 1,
    month = 1,
    day: number;

  // Handle 400-year cycles (146,097 days each)
  const fourHundredYearPeriods = Math.floor(dayNumber / 146097);
  dayNumber %= 146097;
  if (dayNumber === 0) {
    return new Date(400 * fourHundredYearPeriods, 12 - 1, 31);
  }

  // Handle 100-year periods (36,524 days each, but only 3 per 400-year cycle)
  const hundredYearPeriods = Math.min(Math.floor(dayNumber / 36524), 3);
  dayNumber -= hundredYearPeriods * 36524;
  if (dayNumber === 0) {
    return new Date(
      400 * fourHundredYearPeriods + 100 * hundredYearPeriods,
      12 - 1,
      31
    );
  }

  // Handle 4-year periods (1,461 days each)
  const fourYearPeriods = Math.floor(dayNumber / 1461);
  dayNumber %= 1461;
  if (dayNumber === 0) {
    return new Date(
      400 * fourHundredYearPeriods +
        100 * hundredYearPeriods +
        4 * fourYearPeriods,
      12 - 1,
      31
    );
  }

  // Handle individual years (365 days each, but only 3 per 4-year cycle)
  const singleYears = Math.min(Math.floor(dayNumber / 365), 3);
  dayNumber -= singleYears * 365;
  if (dayNumber === 0) {
    return new Date(
      400 * fourHundredYearPeriods +
        100 * hundredYearPeriods +
        4 * fourYearPeriods +
        singleYears,
      12 - 1,
      31
    );
  }

  year +=
    400 * fourHundredYearPeriods +
    100 * hundredYearPeriods +
    4 * fourYearPeriods +
    singleYears;

  // Calculate month and day within the year
  while (true) {
    const daysInCurrentMonth = getGregorianMonthLength(month, year);

    if (dayNumber <= daysInCurrentMonth) {
      day = dayNumber;
      break;
    }

    dayNumber -= daysInCurrentMonth;
    month++;
  }

  // JavaScript Date constructor uses 0-based months
  return new Date(year, month - 1, day);
}

// Create Ethiopian date from day number
export function createEthiopianDate(dayNumber: number): EthiopianDate {
  const leapYearCycles = Math.floor(dayNumber / 1461);
  const remainingDays = dayNumber % 1461;
  const yearsInCycle = Math.floor(remainingDays / 365);
  const daysInYear = remainingDays % 365;

  if (remainingDays !== 1460) {
    return new EthiopianDate(
      (daysInYear % 30) + 1,
      Math.floor(daysInYear / 30) + 1,
      leapYearCycles * 4 + yearsInCycle
    );
  } else {
    return new EthiopianDate(6, 13, leapYearCycles * 4 + yearsInCycle - 1);
  }
}

// Add Gregorian months
function addGregorianMonths(month: number, year: number): number {
  let totalDays = 0;
  for (let currentMonth = 1; currentMonth < month; currentMonth++) {
    totalDays += getGregorianMonthLength(currentMonth, year);
  }
  return totalDays;
}

// Get day number from Gregorian date
export function getGregorianDayNumber(gregorianDate: Date): number {
  if (!(gregorianDate instanceof Date)) {
    console.error("Invalid date object:", gregorianDate);
    return 0;
  }

  const previousYears = gregorianDate.getFullYear() - 1;
  const leapYears =
    Math.floor(previousYears / 4) -
    Math.floor(previousYears / 100) +
    Math.floor(previousYears / 400);
  const nonLeapYears = previousYears - leapYears;
  const daysInPreviousYears = leapYears * 366 + nonLeapYears * 365;
  const daysInCurrentYear =
    addGregorianMonths(
      gregorianDate.getMonth() + 1,
      gregorianDate.getFullYear()
    ) + gregorianDate.getDate();

  return daysInPreviousYears + daysInCurrentYear;
}

// Legacy function name for backward compatibility
export const getDayNoGregorian = getGregorianDayNumber;

// Convert Gregorian date to Ethiopian date
export function toEthiopian(gregorianDate: Date): EthiopianDate {
  return createEthiopianDate(
    getGregorianDayNumber(gregorianDate) - ETHIOPIAN_CALENDAR_OFFSET
  );
}

// Convert Ethiopian date to Gregorian date
export function toGregorian(ethiopianDate: EtDate): Date {
  return gregorianDateFromDayNo(
    getDayNumber(ethiopianDate) + ETHIOPIAN_CALENDAR_OFFSET
  );
}

// Legacy function names for backward compatibility
export const toEth = toEthiopian;
export const toGreg = toGregorian;

// Format Ethiopian date
export function formatEthiopianDate(
  gregorianDate: Date,
  format: "long" | "short" | "month" | "day" = "long",
  locale: DateType = "AMH"
): string {
  if (!gregorianDate) return "";

  const ethiopianDate = toEth(gregorianDate);

  switch (format) {
    case "short":
      return ethiopianDate.toShortString();
    case "month":
      return locale === "AMH"
        ? `${ETHIOPIAN_MONTHS[ethiopianDate.Month - 1]} ${ethiopianDate.Year}`
        : `${getEthiopianMonthName(ethiopianDate.Month, "EN")} ${
            ethiopianDate.Year
          }`;
    case "day":
      return locale === "AMH"
        ? `${ethiopianDate.Day} ${ETHIOPIAN_MONTHS[ethiopianDate.Month - 1]}`
        : `${ethiopianDate.Day} ${getEthiopianMonthName(
            ethiopianDate.Month,
            "EN"
          )}`;
    default:
      return locale === "AMH"
        ? ethiopianDate.toString()
        : `${ethiopianDate.Day} ${getEthiopianMonthName(
            ethiopianDate.Month,
            "EN"
          )} ${ethiopianDate.Year}`;
  }
}

// Get Ethiopian month name
export function getEthiopianMonthName(
  monthNumber: number,
  locale: DateType = "AMH"
): string {
  if (monthNumber > 0 && monthNumber <= 13) {
    if (locale === "AMH") {
      return ETHIOPIAN_MONTHS[monthNumber - 1];
    } else {
      // For English, convert Ethiopian month to Gregorian month
      // Ethiopian months 1-12 correspond to Gregorian months 9-8
      // Ethiopian month 13 (Pagume) is special
      if (monthNumber === 13) {
        return "September"; // Pagume corresponds to September
      }
      const gregorianMonthNumber = (monthNumber + 8) % 12 || 12;
      return ENGLISH_MONTHS[gregorianMonthNumber - 1];
    }
  }
  return "";
}

// Get Ethiopian day name
export function getEthiopianDayName(
  dayNumber: number,
  locale: DateType = "AMH"
): string {
  if (dayNumber >= 1 && dayNumber <= 7) {
    return locale === "AMH"
      ? ETHIOPIAN_DAYS[dayNumber - 1]
      : ENGLISH_DAYS[dayNumber - 1];
  }
  return "";
}

// Validate Ethiopian date
export function isValidEthiopianDate(ethiopianDate: EtDate): boolean {
  if (ethiopianDate.Year < 1000 || ethiopianDate.Year > 3000) return false;
  if (ethiopianDate.Month < 1 || ethiopianDate.Month > 13) return false;
  if (ethiopianDate.Day < 1) return false;
  if (
    ethiopianDate.Day >
    getEthiopianMonthLength(ethiopianDate.Month, ethiopianDate.Year)
  )
    return false;
  return true;
}

// Add years to Ethiopian date
export function addYearsToEthiopianDate(
  ethiopianDate: EtDate,
  yearsToAdd: number
): EthiopianDate {
  if (!isValidEthiopianDate(ethiopianDate)) {
    throw new Error(
      `Invalid Ethiopian date ${ethiopianDate.Day}-${ethiopianDate.Month}-${ethiopianDate.Year}`
    );
  }

  const newYear = ethiopianDate.Year + yearsToAdd;

  if (ethiopianDate.Month === 13 && ethiopianDate.Day === 6) {
    if (!isEthiopianLeapYear(newYear)) {
      return new EthiopianDate(5, ethiopianDate.Month, newYear);
    }
  }

  return new EthiopianDate(ethiopianDate.Day, ethiopianDate.Month, newYear);
}

// Add days to Ethiopian date
export function addDaysToEthiopianDate(
  ethiopianDate: EtDate,
  daysToAdd: number
): EthiopianDate {
  if (!isValidEthiopianDate(ethiopianDate)) {
    throw new Error(
      `Invalid Ethiopian date ${ethiopianDate.Day}-${ethiopianDate.Month}-${ethiopianDate.Year}`
    );
  }

  return createEthiopianDate(getDayNumber(ethiopianDate) + 1 + daysToAdd);
}

// Compare two Ethiopian dates
export function compareEthiopianDates(
  firstDate: EtDate,
  secondDate: EtDate
): number {
  if (firstDate.Year < secondDate.Year) return -1;
  if (firstDate.Year > secondDate.Year) return 1;

  if (firstDate.Month < secondDate.Month) return -1;
  if (firstDate.Month > secondDate.Month) return 1;

  if (firstDate.Day < secondDate.Day) return -1;
  if (firstDate.Day > secondDate.Day) return 1;

  return 0; // Dates are equal
}

// Get current Ethiopian date
export function getCurrentEthiopianDate(): EthiopianDate {
  return toEth(new Date());
}

// Convert Ethiopian date parts to EthiopianDate object
export function createEthiopianDateFromParts(
  dayNumber: number,
  monthNumber: number,
  yearNumber: number
): EthiopianDate {
  return new EthiopianDate(dayNumber, monthNumber, yearNumber);
}

// Legacy function names for compatibility
export const gregorianToEthiopian = toEthiopian;
export const ethiopianToGregorian = toGregorian;

// Fluent API date converter
export const dateConverter = {
  /**
   * Convert Gregorian date to Ethiopian date with fluent API
   * @param date - Gregorian date (Date object, string, or timestamp)
   * @returns EthiopianDateConverter instance with methods: toString(), toDateString(), format()
   *
   * @example
   * dateConverter.toEthiopian('2025-07-17').toString() // "2018-07-11"
   * dateConverter.toEthiopian('2025-07-17').toDateString() // "Thu Jul 17 2025"
   * dateConverter.toEthiopian('2025-07-17').format('d ፣ MMM DD ቀን YYYY E') // "ሰኞ ፣ ሐምሌ ፲፩ ቀን ፳፻፲፰ ዓ.ም"
   */
  toEthiopian: (date: Date | string | number): EthiopianDateConverter => {
    return new EthiopianDateConverter(date);
  },

  /**
   * Convert Ethiopian date to Gregorian date
   * @param ethiopianDate - Ethiopian date (string "YYYY-MM-DD", parts, or EthiopianDateConverter)
   * @param month - Ethiopian month (if using parts)
   * @param day - Ethiopian day (if using parts)
   * @returns Gregorian Date object
   *
   * @example
   * dateConverter.toGregorian('2018-07-11') // Date object
   * dateConverter.toGregorian(2018, 7, 11) // Date object
   */
  toGregorian: (
    ethiopianDate: string | number | EthiopianDateConverter,
    month?: number,
    day?: number
  ): Date => {
    if (ethiopianDate instanceof EthiopianDateConverter) {
      return toGregorian(ethiopianDate["ethiopianDate"]);
    } else if (typeof ethiopianDate === "string") {
      // Parse Ethiopian date string "YYYY-MM-DD"
      const [year, monthStr, dayStr] = ethiopianDate.split("-").map(Number);
      if (
        !year ||
        !monthStr ||
        !dayStr ||
        isNaN(year) ||
        isNaN(monthStr) ||
        isNaN(dayStr)
      ) {
        throw new Error(
          `Invalid Ethiopian date string: ${ethiopianDate}. Expected format: "YYYY-MM-DD"`
        );
      }
      return toGregorian(new EthiopianDate(dayStr, monthStr, year));
    } else if (
      typeof ethiopianDate === "number" &&
      typeof month === "number" &&
      typeof day === "number"
    ) {
      // Ethiopian date parts (year, month, day)
      if (
        !isValidEthiopianDate({ Day: day, Month: month, Year: ethiopianDate })
      ) {
        throw new Error(
          `Invalid Ethiopian date: ${day}-${month}-${ethiopianDate}`
        );
      }
      return toGregorian(new EthiopianDate(day, month, ethiopianDate));
    } else {
      throw new Error(
        "Invalid parameters for toGregorian. Expected: (string | number, number?, number?) or EthiopianDateConverter"
      );
    }
  },

  /**
   * Get current Ethiopian date
   * @returns EthiopianDateConverter instance for current date
   *
   * @example
   * dateConverter.now().toString() // Current Ethiopian date
   */
  now: (): EthiopianDateConverter => {
    return new EthiopianDateConverter(new Date());
  },

  /**
   * Create Ethiopian date from parts
   * @param year - Ethiopian year
   * @param month - Ethiopian month (1-13)
   * @param day - Ethiopian day (1-30, or 1-5/6 for Pagume)
   * @returns EthiopianDateConverter instance
   *
   * @example
   * dateConverter.fromParts(2018, 7, 11).toString() // "2018-07-11"
   */
  fromParts: (
    year: number,
    month: number,
    day: number
  ): EthiopianDateConverter => {
    return new EthiopianDateConverter(year, month, day);
  },
};

// Ethiopian date converter class
export class EthiopianDateConverter {
  private ethiopianDate: EthiopianDate;

  constructor(date?: Date | string | number, month?: number, day?: number) {
    if (typeof date === "string") {
      // Parse ISO date string
      this.ethiopianDate = toEth(new Date(date));
    } else if (date instanceof Date) {
      this.ethiopianDate = toEth(date);
    } else if (
      typeof date === "number" &&
      typeof month === "number" &&
      typeof day === "number"
    ) {
      // Ethiopian date parts (year, month, day)
      this.ethiopianDate = new EthiopianDate(day, month, date);
    } else {
      this.ethiopianDate = toEth(new Date());
    }
  }

  toString(): string {
    return `${this.ethiopianDate.Year}-${String(
      this.ethiopianDate.Month
    ).padStart(2, "0")}-${String(this.ethiopianDate.Day).padStart(2, "0")}`;
  }

  /**
   * Format Ethiopian date with custom pattern
   * @param pattern - Format pattern with placeholders
   * @param locale - Locale for month and day names ("AMH" | "EN")
   * @returns Formatted date string
   *
   * @example
   * dateConverter.fromParts(2018, 7, 11).format("MMM DD, YYYY") // "ሐምሌ 11, 2018"
   * dateConverter.fromParts(2018, 7, 11).format("MMM DD, YYYY", "EN") // "July 11, 2018"
   */
  format(pattern: string, locale: DateType = "AMH"): string {
    let monthNames: readonly string[];
    let eraText: string;

    if (locale === "EN") {
      // For English, use Gregorian month names based on Ethiopian month mapping
      const gregorianMonthMap = [
        8, // Meskerem -> September
        9, // Tikimt -> October
        10, // Hidar -> November
        11, // Tahsas -> December
        0, // Tir -> January
        1, // Yekatit -> February
        2, // Megabit -> March
        3, // Miyaziya -> April
        4, // Ginbot -> May
        5, // Sene -> June
        6, // Hamle -> July
        7, // Nehase -> August
        8, // Pagume -> September
      ];
      const gregorianMonthIndex =
        gregorianMonthMap[this.ethiopianDate.Month - 1];
      monthNames = [ENGLISH_MONTHS[gregorianMonthIndex]];
      eraText = "E.C.";
    } else {
      monthNames = ETHIOPIAN_MONTHS;
      eraText = "ዓ.ም";
    }

    return pattern
      .replace("YYYY", this.ethiopianDate.Year.toString())
      .replace("MMM", monthNames[0])
      .replace("MM", String(this.ethiopianDate.Month).padStart(2, "0"))
      .replace("DD", String(this.ethiopianDate.Day).padStart(2, "0"))
      .replace("D", this.ethiopianDate.Day.toString())
      .replace("E", eraText)
      .replace(
        "d",
        getEthiopianDayName(
          getEtMonthStartDate(
            this.ethiopianDate.Month,
            this.ethiopianDate.Year
          ),
          locale
        )
      );
  }

  /**
   * Convert to date string format
   * @param locale - Locale for month names ("AMH" | "EN")
   * @returns Formatted date string
   *
   * @example
   * dateConverter.fromParts(2018, 7, 11).toDateString() // "ሐምሌ 11, 2018"
   * dateConverter.fromParts(2018, 7, 11).toDateString("EN") // "July 11, 2018"
   */
  toDateString(locale: DateType = "AMH"): string {
    let monthName: string;

    if (locale === "EN") {
      // For English, use Gregorian month names based on Ethiopian month mapping
      const gregorianMonthMap = [
        8, // Meskerem -> September
        9, // Tikimt -> October
        10, // Hidar -> November
        11, // Tahsas -> December
        0, // Tir -> January
        1, // Yekatit -> February
        2, // Megabit -> March
        3, // Miyaziya -> April
        4, // Ginbot -> May
        5, // Sene -> June
        6, // Hamle -> July
        7, // Nehase -> August
        8, // Pagume -> September
      ];
      const gregorianMonthIndex =
        gregorianMonthMap[this.ethiopianDate.Month - 1];
      monthName = ENGLISH_MONTHS[gregorianMonthIndex];
    } else {
      monthName = ETHIOPIAN_MONTHS[this.ethiopianDate.Month - 1];
    }

    return `${monthName} ${this.ethiopianDate.Day}, ${this.ethiopianDate.Year}`;
  }

  /**
   * Add years to the current Ethiopian date
   * @param years - Number of years to add (can be negative)
   * @returns New EthiopianDateConverter instance with updated date
   *
   * @example
   * const date = dateConverter.fromParts(2018, 7, 11);
   * const futureDate = date.addYears(5); // 2023-07-11
   * const pastDate = date.addYears(-3);  // 2015-07-11
   */
  addYears(years: number): EthiopianDateConverter {
    const newEtDate = addYearsToEthiopianDate(this.ethiopianDate, years);
    return new EthiopianDateConverter(
      newEtDate.Year,
      newEtDate.Month,
      newEtDate.Day
    );
  }

  /**
   * Add days to the current Ethiopian date
   * @param days - Number of days to add (can be negative)
   * @returns New EthiopianDateConverter instance with updated date
   *
   * @example
   * const date = dateConverter.fromParts(2018, 7, 11);
   * const futureDate = date.addDays(30); // 2018-08-10
   * const pastDate = date.addDays(-15);  // 2018-06-26
   */
  addDays(days: number): EthiopianDateConverter {
    const newEtDate = addDaysToEthiopianDate(this.ethiopianDate, days);
    return new EthiopianDateConverter(
      newEtDate.Year,
      newEtDate.Month,
      newEtDate.Day
    );
  }
}
