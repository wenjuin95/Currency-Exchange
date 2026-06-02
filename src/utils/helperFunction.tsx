import { Api } from "@/lib/api";
import { countryNames, per100UnitCurrencies, lowValuecurrencies } from "@/lib/country_code";
import { HistoricalRateData, YearMonthPair, Timeframe, FormattedCurrency } from "@/lib/types"

export class HelperFunction {
	/**
	 * Calculate required months dynamically
	 * @param range Timeframe selected by the user
	 * @return the list of year pair need for the selected timeframe
	 * @note "monthsToGoBack = 2" => prevent 7D at the beginning of the month and there's no data for the current month
	 * @note loop backward form today month to generate the list
	 * @note reverse to have the oldest month first
	*/
	static getRequiredMonths(range: Timeframe): YearMonthPair[] {
		const targets: YearMonthPair[] = [];
		const currentDate = new Date();
		let monthsToGoBack = 1;
		switch (range) {
			case "7D":
				monthsToGoBack = 2;
				break;
			case "1M":
				monthsToGoBack = 2;
				break;
			case "5M":
				monthsToGoBack = 5;
				break;
			case "1Y":
				monthsToGoBack = 12;
				break;
		}
		for (let i = 0; i < monthsToGoBack; i++) {
			const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
			targets.push({
				year: d.getFullYear(),
				month: d.getMonth() + 1,
			});
		}
		return targets.reverse();
	}

	/**
	 * process data for 7 days since data is provice a monthly basic
	 * @param data the list of monthly data provided by the api
	 * @return the list of monthly data with only 7 days if the timeframe is 7D
	 * @note filter out empty month first so we only look at month with real data\
	 * @note "....rate.slice(-7)" => take the latest month with data and slice the last 7 days for the chart
	*/
	static processDataFor7D(data: HistoricalRateData[]): HistoricalRateData[] {
		const validMonth = data.filter(
			monthObj => monthObj.data && Array.isArray(monthObj.data.rate) && monthObj.data.rate.length > 0
		)
		const latestActiveMonth = validMonth[validMonth.length - 1];
		if (latestActiveMonth) {
			return [{
				...latestActiveMonth,
				data: {
					...latestActiveMonth.data,
					rate: latestActiveMonth.data.rate.slice(-7)
				}
			}];
		}
		return [];
	}

	/**
	 * Fetch and format into country name, currency and rate for all countries
	 * @return the list of all country with their currency code and exchange rate
	 * @note call the core api function to get the raw data, then loop through and build the clean layout your UI components want
	 * @note use the country code to get the country name from the countryNames mapping file
	 * @note parse the middle_rate to 2 decimal places for better display
	*/
	static async getAllCountryCurrencyAndRate(): Promise<FormattedCurrency[]> {
		try {
			// Calls the core fetch function right above it!
			const exchangeRateData = await Api.getAllCountryExchangeRate();
			if (!exchangeRateData) return [];

			// Parse it back to an object safely if it returned as a string
			const exchangeRateList = typeof exchangeRateData === "string"
				? JSON.parse(exchangeRateData)
				: exchangeRateData;

			if (!exchangeRateList?.data || !Array.isArray(exchangeRateList.data)) {
				return [];
			}

			// Loop through and build the clean layout your UI components want
			return exchangeRateList.data.map((item: { currency_code: string; rate: { middle_rate: string } }) => {
				const code = item.currency_code || "";
				let middleRate = parseFloat(item.rate.middle_rate || "0");

				if (per100UnitCurrencies.has(code)) {
					middleRate = middleRate / 100;
				}


				const targetunit = lowValuecurrencies.has(code) ? 1000 : 1;
				const finalRate = middleRate * targetunit;

				return {
					country: countryNames[code] || code,
					code: code,
					rate: finalRate.toFixed(2),
					unit: targetunit
				};
			});
		} catch (err) {
			console.error("Error inside getFormattedExchangeRates processing loop:", err);
			return [];
		}
	}

	/**
	 * Fetch the latest update date for the exchange rates
	 * @return the latest update date in Date format
	 * @note call the core api function to get the raw data, then extract the last_updated field from the meta section
	 * @note parse it into Date format for better display and manipulation in the UI
	*/
	static async getlastetUpdateDate(): Promise<Date | null> {
		try {
			const data = await Api.getAllCountryExchangeRate()
			if (data) {
				const dataList = typeof data === "string"
					? JSON.parse(data)
					: data
				const updateDate = dataList.meta.last_updated;
				return new Date(updateDate);
			}
			return null;
		} catch (err) {
			console.error("Error fetching latest update date:", err);
			return null;
		}
	}
}
