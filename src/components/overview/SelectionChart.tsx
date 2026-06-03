import CurrencyChart from "@/utils/CurrencyChart"
import { useChartData } from "@/hooks/useChartData";
import { CurrencyWidgetProps, Timeframe} from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SelectionChart({ defaultCurrency = "USD" }: CurrencyWidgetProps) {
	const {
		countryCode,
		setCountryCode,
		timeFrame,
		setTimeFrame,
		chartData,
		activeCurrency,
		isLoading
	} = useChartData(defaultCurrency);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-theme-muted" />
			</div>
		)
	}

	return (
		<div className="w-full max-w-6xl bg-theme-muted rounded-xl border border-white shadow-md p-4 sm:p-6 animate-fade-in animation-delay-200">
			{/* title and current rate */}
			<div>
				<h1 className="font-bold p-3 text-center tracking-tight text-lg lg:text-xl text-theme-strong">
					{activeCurrency?.unit || 1} {activeCurrency?.code || countryCode} = {activeCurrency?.rate ?? "-"} MYR
				</h1>
			</div>

			{/* Selection Buttons */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
				{/* Timeframe */}
				<div className="flex gap-1 bg-theme-muted  p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
					{(["7D", "1M", "5M", "1Y"] as Timeframe[]).map((range) => (
						<button
							key={range}
							onClick={() => setTimeFrame(range)}
							className={`flex-1 sm:flex-none text-center px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
								timeFrame === range
									? "bg-theme-strong text-white shadow-sm"
									: "text-theme-muted hover:text-theme-strong"
							}`}
						>
							{range}
						</button>
					))}
				</div>

				{/*Country*/}
				<select
					className="text-theme-muted p-1 rounded-lg text-sm w-full sm:w-auto"
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

			{/* display the chart */}
			<div className="w-full h-[250px] md:h-[400px]">
				<CurrencyChart historicalData={chartData} />
			</div>
		</div>
	);
}
