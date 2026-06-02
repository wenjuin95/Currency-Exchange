import { useState, useEffect, useMemo } from "react";
import { FormattedCurrency } from "@/lib/types";
import { HelperFunction } from "@/utils/helperFunction";
import { currencyRegions } from "@/lib/country_code";

export default function CurrencyConverter() {
	const [currencies, setCurrencies] = useState<FormattedCurrency[]>([]);

	const [amount, setAmount] = useState<string>("");
	const [selectCountry, setSelectCountry] = useState<string>("");

	useEffect(() => {
		async function getCountryCurrency() {
			try {
				const CountryCurrency = await HelperFunction.getAllCountryCurrencyAndRate();
				setCurrencies(CountryCurrency);
				const defaultCurrency = CountryCurrency.find(c => c.code === "USD") || CountryCurrency[0];
				if (defaultCurrency) {
					setSelectCountry(defaultCurrency.code);
				}
			} catch (error) {
				console.error("Error fetching country currency data:", error);
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
		return Object.entries(currencyRegions).map(
			([region, codes]) => ({
				region,
				currencies: currencies.filter(currency => codes.includes(currency.code)),
			})
		);
	}, [currencies]);

	const handleAmountChange = (inputValue: string) => {
		const sanitized = inputValue.replace(/[^0-9.]/g, "");

		if (sanitized.split(".").length > 2) {
		  return;
		}

		setAmount(sanitized);
	}

	return (
		// Restricted total width to max-w-md on mobile, stretching to max-w-lg on laptops
		<div className="p-5 max-w-md lg:max-w-lg ml-0 lg:ml-4 w-full transition-all duration-200">
			<div className="p-5 lg:p-6 bg-white rounded-xl shadow-sm border border-black/5 mt-6">
				<h2 className="text-base lg:text-lg font-bold text-gray-800 mb-4">
					Currency Converter
				</h2>

				{/* Elements stack cleanly inside the restricted width container */}
				<div className="flex flex-col gap-y-3">

					{/* Dropdown Row - Stacked and fills the card width naturally */}
					<div className="flex flex-col gap-y-1">
						<label className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-wide px-1">
							Select Currency
						</label>
						<select
							value={selectCountry}
							onChange={(e) => setSelectCountry(e.target.value)}
							className="border rounded-lg px-3 py-2 text-sm bg-gray-50 font-bold focus:outline-none w-full cursor-pointer"
						>
							{groupedCurrencies.map(group => (
								<optgroup
									key={group.region}
									label={group.region}
								>
									{group.currencies.map(currency => (
										<option
											key={currency.code}
											value={currency.code}
										>
											{currency.code} - {currency.country} ({currency.unit.toLocaleString()} Unit)
										</option>
									))}
								</optgroup>
							))}
						</select>
					</div>

					{/* Input Row - Stacked right underneath */}
					<div className="flex flex-col gap-y-1 mt-1">
						<label className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-wide px-1">
							Amount ({selectCountry})
						</label>
						<input
							type="text"
							inputMode="decimal"
							placeholder="0.00"
							value={amount}
							onChange={(e) => handleAmountChange(e.target.value)}
							className="border rounded-lg px-3 py-2 text-base lg:text-lg font-black w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/20"
						/>
					</div>

					{/* Short, clean divider arrow */}
					<div className="text-xs font-bold text-gray-400 px-1 py-1">↓ converts to</div>

					{/* Result Block */}
					<div className="flex items-center justify-between p-3 lg:p-4 bg-black/10 rounded-xl border border-black/5">
						<span className="text-xs font-bold text-black-800 uppercase tracking-wider">
							Total Estimation
						</span>
						<span className="text-xl lg:text-2xl font-black text-black">
							RM {result}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
