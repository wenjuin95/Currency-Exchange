import { useEffect, useState } from "react"
import { getExchangeRate, getHistoricalRates, YearMonthPair } from "@/lib/api"
import CurrencyChart from "@/components/chart/CurrencyChart"

type Timeframe = "7D" | "1M" | "5M" | "1Y";

export default function UsdChart() {
	const [currencies, setCurrencies] = useState<{ country: string,code: string, rate: number }[]>([])
	const [timeFrame, setTimeFrame] = useState<Timeframe>('1M');
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(true);

	//to figure out the required month-year pairs based on the selected timeframe
	const getRequiredMonths = (range: Timeframe): YearMonthPair[] => {
		const targets: YearMonthPair[] = [];
		const currentDate = new Date();

		let monthsToGoBack = 1;
		switch (range) {
			case "7D":
				monthsToGoBack = 1;
				break;
			case "1M":
				monthsToGoBack = 1;
				break;
			case "5M":
				monthsToGoBack = 5;
				break;
			case "1Y":
				monthsToGoBack = 12;
				break;
		}

		//loop backward form today month to generate the list
		for (let i = 0; i < monthsToGoBack; i++) {
			const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
			targets.push({
				year: d.getFullYear(),
				month: d.getMonth() + 1, // getMonth() returns 0-based month
			});
		}

		// reverse to have the oldest month first, which is more intuitive for charting
		return targets.reverse();
	}

	useEffect(() => {
		async function getData() {
			setLoading(true);
			const targetCountry = "USD";

			// 1. Calculate required months dynamically
			const requiredTargets = getRequiredMonths(timeFrame);

			// 2. Fetch the data block from BNM
			const results = await getHistoricalRates(targetCountry, requiredTargets);

			if (results) {
				let processedResults = [...results];

				// 3. Special rule for 7 Days: If the user clicked "7D", we filter the final
				// nested rates down to just the last 7 entries so the chart isn't crowded.
				if (timeFrame === "7D") {
					processedResults = results.map(monthObj => {
						if (monthObj.data && Array.isArray(monthObj.data.rate)) {
							return {
								...monthObj,
								data: {
									...monthObj.data,
									// Take only the last 7 items available in the dataset
									rate: monthObj.data.rate.slice(-7)
								}
							};
						}
						return monthObj;
					});
				}

				setChartData(processedResults);
			}
			setLoading(false);
		}

		async function fetchData() {
			const exchangeRateData = await getExchangeRate()
			if (exchangeRateData) {
				const exchangeRateList = typeof exchangeRateData === "string"
					? JSON.parse(exchangeRateData)
					: exchangeRateData

				const USDRate = exchangeRateList.data.find((item: { currency_code: string }) => item.currency_code === "USD")
				if (USDRate) {
					setCurrencies([{
						country: "United States",
						code: "USD",
						rate: parseFloat(USDRate.rate.middle_rate).toFixed(2)
					}])
				}
			}
		}

		fetchData()
		getData();
	}, [timeFrame]); // 🔄 Automatically re-runs whenever the user clicks a different timeframe button!

	if (loading) return <div>Loading historical data...</div>

return (
	// w-full makes it fluid, max-w-4xl stops it from stretching too wide on massive screens
	<div className="w-full max-w-4xl mx-auto bg-black/5 rounded-xl shadow-md p-4 sm:p-6">
		<div>
			<h1 className="font-bold p-3 text-center">1 USD = {currencies[0]?.rate} MYR</h1>
		</div>
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
			{/* Timeframe Selection Buttons */}
			<div className="flex gap-1 bg-black/5  p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
				{(["7D", "1M", "5M", "1Y"] as Timeframe[]).map((range) => (
					<button
						key={range}
						onClick={() => setTimeFrame(range)}
						className={`flex-1 sm:flex-none text-center px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
							timeFrame === range
								? "bg-black/90 text-white shadow-sm"
								: "text-gray-600 hover:text-black/90"
						}`}
					>
						{range}
					</button>
				))}
			</div>
		</div>

		{/* Chart Wrapper: We ensure this container also mimics the exact
		   responsive height steps we built in Step 1.
		*/}
		<div className="w-full h-[250px] md:h-[400px]">
			<CurrencyChart historicalData={chartData} />
		</div>
	</div>
);
}
