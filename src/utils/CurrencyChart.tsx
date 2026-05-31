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
import { CurrencyChartProps, DayRate, HistoricalMonth} from '@/lib/types';

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

		// Extract labels (Dates) securely
		const labels = historicalData.flatMap((monthObj: HistoricalMonth) => {
			if (monthObj?.data?.rate && Array.isArray(monthObj.data.rate)) {
				return monthObj.data.rate.map((day: DayRate) => day.date);
			}
			return [];
		});

		// Extract data points (Rates) securely
		const rates = historicalData.flatMap((monthObj: HistoricalMonth) => {
			if (monthObj?.data?.rate && Array.isArray(monthObj.data.rate)) {
				return monthObj.data.rate.map((day: DayRate) =>
					typeof day.middle_rate === 'string'
						? parseFloat(day.middle_rate)
						: day.middle_rate
				);
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
					callback: (value: any) => parseFloat(value).toFixed(2),
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
