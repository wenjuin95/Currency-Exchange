import { useEffect, useState } from "react"
import { getExchangeRate, getHistoricalRates} from "@/lib/api"
import CurrencyChart from "@/utils/CurrencyChart"
import { HistoricalRateData, YearMonthPair, CurrencyWidgetProps} from "@/lib/types";

type Timeframe = "7D" | "1M" | "5M" | "1Y";

export default function SelectionChart({ defaultCurrency = "USD" }: CurrencyWidgetProps) {
	const [countryCode, setCountryCode ] = useState<string>(defaultCurrency);
	const [currencies, setCurrencies] = useState<{ country: string,code: string, rate: number }[]>([])
	const [timeFrame, setTimeFrame] = useState<Timeframe>('1M');
	const [chartData, setChartData] = useState<HistoricalRateData[]>([]);
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
			const targetCountry = countryCode;

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
                        console.log("Processing month:", monthObj.year, monthObj.month, "with", monthObj.data?.rate.length, "entries");
						return monthObj;
					});
				}

				setChartData(processedResults);
			}
		}

        //TODO - change this code to use the api
		async function fetchData() {
			const exchangeRateData = await getExchangeRate()
			if (exchangeRateData) {
				const exchangeRateList = typeof exchangeRateData === "string"
					? JSON.parse(exchangeRateData)
					: exchangeRateData

				const targetRate = exchangeRateList.data.find((item: { currency_code: string }) => item.currency_code === countryCode)
				if (targetRate) {
					setCurrencies([{
						country: "",
						code: countryCode,
						rate: Number(parseFloat(targetRate.rate.middle_rate).toFixed(2))
					}])
				}
			}
		}

		fetchData()
		getData();
	}, [timeFrame, countryCode]); // 🔄 Automatically re-runs whenever the user clicks a different timeframe button!

	return (
		<div className="w-full max-w-4xl mx-auto bg-black/5 rounded-xl shadow-md p-4 sm:p-6 animate-fade-in animation-delay-200">
			<div>
				<h1 className="font-bold p-3 text-center">1 {currencies[0]?.code || countryCode} = {currencies[0]?.rate ?? "-"} MYR</h1>
			</div>

			{/* Selection Buttons */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
				{/* Timeframe */}
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

				{/*Country*/}
				<select
					className="bg-black/5 p-1 rounded-lg text-sm w-full sm:w-auto"
					value={countryCode}
					onChange={(e) => setCountryCode(e.target.value)}
					//disabled // For now, we only have USD data in the chart, so this dropdown is disabled. In the future, we can expand to support more currencies and enable this.
				>
					<option value="USD">USD (United States Dollar)</option>
					<option value="SGD">SGD (Singapore Dollar)</option>
					<option value="CNY">CNY (Chinese Yuan)</option>
					<option value="JPY">JPY (Japanese Yen)</option>
					<option value="KRW">KRW (South Korean Won)</option>
				</select>
			</div>

			<div className="w-full h-[250px] md:h-[400px]">
				<CurrencyChart historicalData={chartData} />
			</div>
		</div>
	);
}
