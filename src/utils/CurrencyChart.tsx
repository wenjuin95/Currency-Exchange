import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CurrencyChartProps, RateEntry, HistoricalRateData} from '@/lib/types';
import { per100UnitCurrencies } from '@/lib/country_code';

// 1. Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CurrencyChart({ historicalData }: CurrencyChartProps) {
// 3. Compute chartData dynamically on the fly using useMemo instead of useEffect + useState
	const chartData = useMemo(() => {
		if (!historicalData || historicalData.length === 0) return null;
		// console.log("Processing chart data from historicalData:", historicalData);

		// Extract labels (Dates) securely
		const labels = historicalData.flatMap((monthObj: HistoricalRateData) => {
			if (monthObj?.data?.rate && Array.isArray(monthObj.data.rate)) {
				return monthObj.data.rate.map((day: RateEntry) => day.date);
			}
			return [];
		});

		// Extract data points (Rates) securely
		// const countryCode = historicalData[0]?.data?.currency_code || ""; // Safely access currency code
		const rates = historicalData.flatMap((monthObj: HistoricalRateData) => {
			// console.log(`Country code for per100Unit check: ${countryCode}`);
			if (monthObj?.data?.rate && Array.isArray(monthObj.data.rate)) {
				return monthObj.data.rate.map((day: RateEntry) => Number(day.middle_rate).toFixed(3));
			}
			return [];
		});

		return {
			labels: labels,
			datasets: [
				{
					label: 'Exchange Rate',
					data: rates,
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.5)',
					tension: 0.2,
				},
			],
		};
	}, [historicalData]); // Re-runs ONLY if historicalData reference updates

	// 4. Customise layout rules (Grid lines, titles, etc.)
	const options = {
		elements: {
			point: {
				radius: 3, // Smaller points for a cleaner look
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
		scales: {
			x: {
				offset: true,
				grid: {
					display: false, // Optional: Removes vertical grid lines for a cleaner look
				},
				ticks: {
					autoSkip: true, // Automatically skip some labels if there are too many
					maxTicksLimit: 7,
					maxRotation:0,
					minRotation:0,
				},
			},
			y: {
				ticks: {
					// Formats numbers to look like currency decimals
					callback: (value: number | string) => Number(value).toFixed(3),
				},
			},
		},
	};

	if (!chartData) return <div className="text-sm text-gray-500">Processing graph...</div>;

	return (
		<div className="relative w-full h-[250px] md:h-[400px]">
			{/* 5. Render the imported Line component */}
			<Line options={options} data={chartData} />
		</div>
	);
}
