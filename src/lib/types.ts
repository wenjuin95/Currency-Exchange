// Define what an individual rate entry looks like (e.g., daily rate details)
interface RateEntry {
    date: string;
    value: number;
    // Add other specific properties returned by the BNM API here if needed
}

// Define the data container
interface MonthlyDataContainer {
    rate: RateEntry[];
}

// Define the final structure for your chart data state
export interface HistoricalRateData {
    year: number;
    month: number;
    data: MonthlyDataContainer;
}

export interface YearMonthPair {
	year: number;
	month: number;
}

// 2. Define strict structures for TypeScript
export interface DayRate {
  date: string;
  middle_rate: string | number; // Handles both API structures safely
}

interface MonthData {
  rate: DayRate[];
}

export interface HistoricalMonth {
  year: number;
  month: number;
  data: MonthData;
}

export interface CurrencyChartProps {
  historicalData: HistoricalMonth[];
}