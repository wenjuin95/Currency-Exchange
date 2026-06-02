import { YearMonthPair } from "@/lib/types";
import { countryNames } from "@/lib/country_code";
import { FormattedCurrency } from "@/lib/types";

const baseUrl = "/bnm-api/public/exchange-rate"

export async function getExchangeRate() {
	try {
		const res = await fetch(`${baseUrl}?session=1700&quote=rm`, {
			headers: {
				Accept: "application/vnd.BNM.API.v1+json",
			}
		})

		if (!res.ok) {
			throw new Error(`Fail to fetch exchange rate: ${res.status} ${res.statusText}`)
		}

		const dataList = await res.json()
		const data = JSON.stringify(dataList, null, 2)
		return data
	} catch (err) {
		console.error(err)
		return null
	}
}

export async function getFormattedExchangeRate(): Promise<FormattedCurrency[]> {
	try {
		// Calls the core fetch function right above it!
		const exchangeRateData = await getExchangeRate();
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
			const middleRate = item.rate?.middle_rate || "0";

			return {
				country: countryNames[code] || code,
				code: code,
				rate: parseFloat(middleRate).toFixed(2)
			};
		});
	} catch (err) {
		console.error("Error inside getFormattedExchangeRates processing loop:", err);
		return [];
	}
}

export async function getHistoricalRates(countryCode: string, targets: YearMonthPair[]) {
	try {
		const fetchPromises = targets.map(async ({ year, month }) => {
			const url = `${baseUrl}/${countryCode}/year/${year}/month/${month}?session=1700&quote=rm`
			const res = await fetch(url, {
				headers: {
					Accept: "application/vnd.BNM.API.v1+json",
				}
			})

			if (!res.ok) {
				return { year, month, data: { rate: [] } }
			}

			const data = await res.json()
			return { year, month, data: data.data }
		});

		return await Promise.all(fetchPromises);
	} catch (err) {
		console.error(err)
		return null
	}
}
