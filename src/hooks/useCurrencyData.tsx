import { useEffect, useState, useMemo } from "react"
import { FormattedCurrency } from "@/lib/types";
import { HelperFunction } from "@/utils/helperFunction";

export function useCurrencyData() {
	const [currencies, setCurrencies] = useState<FormattedCurrency[]>([])

	useEffect(() => {
		async function getAllCountryExchangeRate() {
			try {
				const exchangeRate = await HelperFunction.getAllCountryCurrencyAndRate();
				setCurrencies(exchangeRate);
			} catch (error) {
				console.error("Error fetching exchange rates:", error);
			}
		}
		getAllCountryExchangeRate();
	}, []);

	// useMemo caches the split columns so they don't break on general re-renders
	const columns = useMemo(() => {
		const half = Math.ceil(currencies.length / 2);
		return {
			leftColumnData: currencies.slice(0, half),
			rightColumnData: currencies.slice(half),
		};
	}, [currencies]);

	return columns;
}
