import { useEffect, useState } from 'react';
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

export default function CurrencyChart({ historicalData }) {
	const [chartData, setChartData] = useState<any>(null);

	useEffect(() => {
		if (!historicalData || historicalData.length === 0) return;

		// 1. Safely filter and extract labels (Dates)
		const labels = historicalData.flatMap((monthObj: any) => {
			// Check if monthObj exists, has data, and that data is an array
			if (monthObj && monthObj.data && Array.isArray(monthObj.data.rate)) {
				return monthObj.data.rate.map((day: any) => day.date);
			}
			return []; // Return an empty array if the month is empty/broken
		});

		// 2. Safely filter and extract data points (Rates)
		const rates = historicalData.flatMap((monthObj: any) => {
			if (monthObj && monthObj.data && Array.isArray(monthObj.data.rate)) {
				return monthObj.data.rate.map((day: any) => parseFloat(day.middle_rate).toFixed(2));
			}
			return [];
		});

		// 3. Set the structured Chart.js data object
		setChartData({
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
		});
	}, [historicalData]);

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
