import { useEffect, useState } from "react";
import { Api } from "@/lib/api";
import { HelperFunction } from "@/utils/helperFunction";
import { HistoricalRateData, Timeframe, FormattedCurrency} from "@/lib/types";

export function useChartData(defaultCurrency: string) {
	const [countryCode, setCountryCode ] = useState<string>(defaultCurrency);
	const [timeFrame, setTimeFrame] = useState<Timeframe>('7D');
	const [chartData, setChartData] = useState<HistoricalRateData[]>([]);
	const [activeCurrency, setActiveCurrency] = useState<FormattedCurrency | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		// fetch the data with required parameters whenever countryCode or timeFrame changes
		async function retrieveTimeFrameData() {
			try {
				setIsLoading(true);
				const requiredTargets = HelperFunction.getRequiredMonths(timeFrame);
				const results = await Api.getHistoricalRates(countryCode, requiredTargets);
				if (results) {
					let processedResults = [...results];
					if (timeFrame === "7D") {
						processedResults = HelperFunction.processDataFor7D(results);
					}
					setChartData(processedResults);
				}
			} catch (error) {
				console.error("Error fetching historical chart rates:", error);
			} finally {
				setIsLoading(false);
			}
		}

		// get the selected country's current currency and rate to display in the chart title
		async function getTargetedCountryCurrencyAndRate() {
			try {
				setIsLoading(true);
				const allCurrencies = await HelperFunction.getAllCountryCurrencyAndRate();
				const targetCurrency = allCurrencies.find(
					(item: FormattedCurrency) => item.code === countryCode
				);
				if (targetCurrency) {
					setActiveCurrency(targetCurrency);
				}
			} catch (error) {
				console.error("Error matching targeted country profile:", error);
			} finally {
				setIsLoading(false);
			}
		}

		retrieveTimeFrameData();
		getTargetedCountryCurrencyAndRate();
	}, [timeFrame, countryCode]);

	return {
		countryCode,
		setCountryCode,
		timeFrame,
		setTimeFrame,
		chartData,
		activeCurrency,
		isLoading
	}
}
