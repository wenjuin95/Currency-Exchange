import { useState, useEffect, useMemo } from "react";
import { FormattedCurrency } from "@/lib/types";
import { HelperFunction } from "@/utils/helperFunction";
import { currencyRegionsConverter } from "@/lib/country_code";

export function useCurrencyRate(amount: string) {
	const [currencies, setCurrencies] = useState<FormattedCurrency[]>([]);
	const [selectCountry, setSelectCountry] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getCountryCurrency() {
			try {
				setIsLoading(true);
				const CountryCurrency = await HelperFunction.getAllCountryCurrencyAndRate();
				setCurrencies(CountryCurrency);
				const defaultCurrency = CountryCurrency.find(c => c.code === "USD") || CountryCurrency[0];
				if (defaultCurrency) {
					setSelectCountry(defaultCurrency.code);
				}
			} catch (error) {
				console.error("Error fetching country currency data:", error);
			} finally {
				setIsLoading(false);
			}
		}
		getCountryCurrency();
	}, []);

	const result = useMemo(() => {
		const numericAmount = Number(amount);
		const currency = currencies.find(c => c.code === selectCountry);
		if (!currency || Number.isNaN(numericAmount)) {
			return "0.00";
		}
		const converted = (numericAmount / currency.unit) * currency.rate;

		return converted.toFixed(2);
	}, [amount, selectCountry, currencies]);

	const groupedCurrencies = useMemo(() => {
		return Object.entries(currencyRegionsConverter).map(
			([region, codes]) => ({
				region,
				currencies: currencies.filter(currency => codes.includes(currency.code)),
			})
		);
	}, [currencies]);

	return {
		selectCountry,
		setSelectCountry,
		result,
		groupedCurrencies,
		isLoading,
		Error
	}
}
