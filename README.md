# React Ethiopian Date Picker 🇪🇹

A modern, accessible Ethiopian date picker component built with React and TypeScript. Features full Amharic language support, accurate Ethiopian calendar conversions, and a clean, robust API.

## ✨ Features

- 🇪🇹 **Full Ethiopian Calendar Support** - Accurate Ethiopian date conversions
- 🗣️ **Amharic Language** - Complete Amharic interface with proper fonts
- 🎨 **Modern UI** - Beautiful design with Tailwind CSS
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 📱 **Responsive** - Works perfectly on all device sizes
- ⚡ **Fast & Lightweight** - Optimized for performance
- 🔧 **Customizable** - Easy to customize colors, sizes, and behavior
- 🧪 **TypeScript** - Full type safety and IntelliSense support
- 🔄 **Fluent API** - Clean and intuitive date conversion methods

## 🚀 Quick Start

### Installation

```bash
# Install from npm
npm install react-ethiopian-date-picker

# Or using yarn
yarn add react-ethiopian-date-picker
```

### Basic Usage

```tsx
import React, { useState } from "react";
import {
  EthiopianDatePicker,
  dateConverter,
} from "react-ethiopian-date-picker";

// Import styles (optional - included automatically)
import "react-ethiopian-date-picker/dist/style.css";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      // Convert to Ethiopian date
      const ethiopian = dateConverter.toEthiopian(date);
      console.log("Ethiopian date:", ethiopian.toString());
    }
  };

  return (
    <EthiopianDatePicker
      selectedDate={selectedDate}
      onDateChange={handleDateChange}
      placeholder="ቀን ይምረጡ"
    />
  );
}
```

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mikiyasegaye/react-ethiopian-date-picker.git
cd react-ethiopian-date-picker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Basic Usage

```tsx
import React, { useState } from "react";
import EthiopianDatePicker from "./components/EthiopianDatePicker";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  return (
    <EthiopianDatePicker
      selectedDate={selectedDate}
      onDateChange={handleDateChange}
      placeholder="ቀን ይምረጡ"
    />
  );
}
```

## 📦 Component Props

| Prop           | Type                           | Default                      | Description                |
| -------------- | ------------------------------ | ---------------------------- | -------------------------- |
| `selectedDate` | `Date \| null`                 | `null`                       | Currently selected date    |
| `onDateChange` | `(date: Date \| null) => void` | -                            | Callback when date changes |
| `placeholder`  | `string`                       | `"Select Ethiopian date..."` | Input placeholder text     |
| `disabled`     | `boolean`                      | `false`                      | Disable the date picker    |
| `className`    | `string`                       | `""`                         | Additional CSS classes     |

## 🔧 Core API

### Date Converter (Fluent API)

The `dateConverter` provides a clean, fluent API for Ethiopian date operations:

```tsx
import { dateConverter } from "./utils/ethiopianDateUtils";

// Convert Gregorian to Ethiopian
const ethiopian = dateConverter.toEthiopian("2025-07-17");
console.log(ethiopian.toString()); // "2018-07-11"
console.log(ethiopian.toDateString()); // "ሐምሌ 11, 2018"
console.log(ethiopian.format("d ፣ MMM DD ቀን YYYY E")); // "ሰኞ ፣ ሐምሌ ፲፩ ቀን ፳፻፲፰ ዓ.ም"

// Convert Ethiopian to Gregorian
const gregorian = dateConverter.toGregorian("2018-07-11");
console.log(gregorian.toDateString()); // "Wed Jul 17 2025"

// Get current Ethiopian date
const today = dateConverter.now();
console.log(today.toString()); // Current Ethiopian date

// Create from parts
const custom = dateConverter.fromParts(2018, 7, 11);
console.log(custom.toString()); // "2018-07-11"
```

### Core Functions

```tsx
import {
  toEthiopian,
  toGregorian,
  formatEthiopianDate,
  isValidEthiopianDate,
  isEthiopianLeapYear,
} from "./utils/ethiopianDateUtils";

// Convert Gregorian to Ethiopian
const ethiopianDate = toEthiopian(new Date("2025-07-17"));
console.log(ethiopianDate); // { Day: 11, Month: 7, Year: 2018 }

// Convert Ethiopian to Gregorian
const gregorianDate = toGregorian({ Day: 11, Month: 7, Year: 2018 });
console.log(gregorianDate); // Date object

// Format Ethiopian date
const formatted = formatEthiopianDate(new Date(), "long"); // "11 ሐምሌ 2018 ዓ.ም"

// Validate Ethiopian date
const isValid = isValidEthiopianDate({ Day: 11, Month: 7, Year: 2018 }); // true

// Check leap year
const isLeap = isEthiopianLeapYear(2018); // false
```

## 🎨 Customization

### Styling with Tailwind CSS

The component uses Ethiopian flag colors by default:

```css
:root {
  --ethiopian-green: #228b22;
  --ethiopian-yellow: #ffd700;
  --ethiopian-red: #da121a;
  --ethiopian-blue: #006c93;
}
```

### Custom Classes

```tsx
<EthiopianDatePicker
  className="w-full border-2 border-blue-500 rounded-lg"
  placeholder="የኢትዮጵያ ቀን ይምረጡ..."
/>
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        "ethiopian-green": "#228B22",
        "ethiopian-yellow": "#FFD700",
      },
      fontFamily: {
        amharic: ["Noto Sans Ethiopic", "sans-serif"],
      },
    },
  },
};
```

## 🌍 Localization

### Amharic Font Setup

Add Amharic font support to your project:

```css
/* index.css */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;700&display=swap");

.font-amharic {
  font-family: "Noto Sans Ethiopic", sans-serif;
}
```

### Format Options

```tsx
// Different format types
formatEthiopianDate(date, "long", "AMH"); // "11 ሐምሌ 2018 ዓ.ም"
formatEthiopianDate(date, "short", "AMH"); // "11/7/2018"
formatEthiopianDate(date, "month", "AMH"); // "ሐምሌ 2018"
formatEthiopianDate(date, "day", "AMH"); // "11 ሐምሌ"

// English locale
formatEthiopianDate(date, "long", "EN"); // "11 July 2018"
```

## 📊 Data Structures

### Ethiopian Date Interface

```typescript
interface EtDate {
  Day: number; // 1-30 (or 1-5/6 for Pagume)
  Month: number; // 1-13 (13 is Pagume)
  Year: number; // Ethiopian year
}
```

### Ethiopian Date Class

```typescript
class EthiopianDate implements EtDate {
  constructor(Day: number, Month: number, Year: number);
  toString(): string; // "11 ሐምሌ 2018"
  toShortString(): string; // "11/7/2018"
}
```

## 🧪 Testing

### Unit Tests

```typescript
import {
  toEthiopian,
  toGregorian,
  isValidEthiopianDate,
} from "./utils/ethiopianDateUtils";

describe("Ethiopian Date Utils", () => {
  test("converts Gregorian to Ethiopian correctly", () => {
    const gregDate = new Date("2025-07-17");
    const ethDate = toEthiopian(gregDate);
    expect(ethDate.toString()).toBe("11 ሐምሌ 2018");
  });

  test("validates Ethiopian dates", () => {
    const validDate = { Day: 11, Month: 7, Year: 2018 };
    expect(isValidEthiopianDate(validDate)).toBe(true);
  });
});
```

## 🚨 Common Issues & Solutions

### 1. Font Display Issues

**Problem:** Amharic text not displaying correctly

**Solution:** Ensure Amharic font is loaded:

```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;700&display=swap");
```

### 2. Date Conversion Errors

**Problem:** Invalid date conversion

**Solution:** Always use Date objects for Gregorian dates:

```typescript
// ✅ Correct
const date = new Date("2025-07-17");
const ethDate = toEthiopian(date);

// ❌ Incorrect
const date = "2025-07-17";
const ethDate = toEthiopian(date); // Error
```

### 3. TypeScript Errors

**Problem:** Type errors with date parameters

**Solution:** Use proper type annotations:

```typescript
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

const handleDateChange = (date: Date | null) => {
  setSelectedDate(date);
};
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ethiopian calendar conversion algorithms
- React and TypeScript for robust development
- Tailwind CSS for beautiful styling
- Noto Sans Ethiopic font for Amharic support

## 📞 Support

If you have any questions or need help, please:

1. Check the documentation above
2. Search [existing issues](https://github.com/mikiyasegaye/react-ethiopian-date-picker/issues)
3. Create a [new issue](https://github.com/mikiyasegaye/react-ethiopian-date-picker/issues/new)

---

Made with ❤️ for the Ethiopian community
