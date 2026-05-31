// Define what an individual rate entry looks like (e.g., daily rate details)
export interface RateEntry {
    date: string;
    value: number;
    middle_rate: number; // Matches the BNM structure cleanly
    // Add other specific properties returned by the BNM API here if needed
}

// Define the data container
export interface MonthlyDataContainer {
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

export interface DayRate {
    date: string;
    middle_rate: string | number; // Matches the BNM structure cleanly
    // Add other properties if BNM returns them (e.g., buying_rate, selling_rate)
}

export interface CurrencyChartProps {
    historicalData: HistoricalRateData[];
}

export interface CurrencyWidgetProps {
    defaultCurrency: string;
}

export type ViewType = "rates" | "charts"

export interface ViewToggleNavigationProps {
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
}