import { useEffect, useState } from "react"
import CurrencyChart from "@/utils/CurrencyChart"
import { HelperFunction } from "@/utils/helperFunction";
import { Api } from "@/lib/api"
import { HistoricalRateData, CurrencyWidgetProps, Timeframe, FormattedCurrency} from "@/lib/types";

export default function SelectionChart({ defaultCurrency = "USD" }: CurrencyWidgetProps) {
	const [countryCode, setCountryCode ] = useState<string>(defaultCurrency);
	const [currencies, setCurrencies] = useState<FormattedCurrency[]>([])
	const [timeFrame, setTimeFrame] = useState<Timeframe>('1M');
	const [chartData, setChartData] = useState<HistoricalRateData[]>([]);

	useEffect(() => {
		async function retrieveTimeFrameData() {
			const targetCountry = countryCode;
			const requiredTargets = HelperFunction.getRequiredMonths(timeFrame);
			const results = await Api.getHistoricalRates(targetCountry, requiredTargets);

			if (results) {
				let processedResults = [...results];

				if (timeFrame === "7D") {
					processedResults = HelperFunction.processDataFor7D(results);
				}
				setChartData(processedResults);
			}
		}
		retrieveTimeFrameData();

		async function getTargetedCountryCurrencyAndRate() {
			const allCurrencies = await HelperFunction.getAllCountryCurrencyAndRate();
			const targetCurrency = allCurrencies.find((item: FormattedCurrency) => item.code === countryCode);
			if (targetCurrency) {
				setCurrencies([targetCurrency]);
			}
		}
		getTargetedCountryCurrencyAndRate();
	}, [timeFrame, countryCode]); // Automatically re-runs whenever the user clicks a different timeframe button!

	return (
		<div className="w-full max-w-4xl mx-auto bg-black/5 rounded-xl shadow-md p-4 sm:p-6 animate-fade-in animation-delay-200">
			<div>
				<h1 className="font-bold p-3 text-center">{currencies[0]?.unit || 1} {currencies[0]?.code || countryCode} = {currencies[0]?.rate ?? "-"} MYR</h1>
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
