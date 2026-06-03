import { useEffect, useState, useMemo } from "react"
import { FormattedCurrency } from "@/lib/types";
import { HelperFunction } from "@/utils/helperFunction";
import { currencyRegions } from "@/lib/country_code";

export function useCurrencyData() {
	const [currencies, setCurrencies] = useState<FormattedCurrency[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getAllCountryExchangeRate() {
			try {
				setIsLoading(true);
				const exchangeRate = await HelperFunction.getAllCountryCurrencyAndRate();
				setCurrencies(exchangeRate);
			} catch (error) {
				console.error("Error fetching exchange rates:", error);
			} finally {
				setIsLoading(false);
			}
		}
		getAllCountryExchangeRate();
	}, []);

	// Formats data into regions. Only recalculates when currency data shifts.
	const regionsData = useMemo(() => {
		return Object.entries(currencyRegions)
			.map(([regionName, codes]) => {
				// Filter and find the active exchange rate payload matching the region array codes
				const matchedCurrencies = currencies.filter(currency =>
					codes.includes(currency.code)
				);

				return {
					region: regionName,
					currencies: matchedCurrencies
				};
			})
			// Optional: Filters out regions if the API didn't return any data for them yet
			.filter(group => group.currencies.length > 0);
	}, [currencies]);

	return { regionsData, isLoading };
}
