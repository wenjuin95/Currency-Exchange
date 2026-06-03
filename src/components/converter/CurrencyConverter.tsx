import { HelperFunction } from "@/utils/helperFunction";
import { useCurrencyRate } from "@/hooks/useCurrencyRate";
import { currencySymbols } from "@/lib/country_code";

export default function CurrencyConverter() {
	const { amount, handleAmountChange } = HelperFunction.handleAmountInput("");
	const { selectCountry, setSelectCountry, result, groupedCurrencies } = useCurrencyRate(amount);
	const activeSymbol = currencySymbols[selectCountry] || "";

	return (
		// Restricted total width to max-w-md on mobile, stretching to max-w-lg on laptops
		<div className="p-5 max-w-md lg:max-w-lg ml-0 lg:ml-4 w-full transition-all animate-fade-in animation-delay-200">
			<div className="p-5 lg:p-6 bg-theme-muted rounded-xl shadow-sm border border-theme-muted mt-6">
				<h2 className="text-base lg:text-lg font-bold text-theme-strong mb-4">
					Currency Converter
				</h2>

				{/* Elements stack cleanly inside the restricted width container */}
				<div className="flex flex-col gap-y-3">

					{/* Dropdown Row - Stacked and fills the card width naturally */}
					<div className="flex flex-col gap-y-1">
						<label className="text-[10px] lg:text-xs font-bold text-theme-muted uppercase tracking-wide px-1">
							Select Currency
						</label>
						<select
							value={selectCountry}
							onChange={(e) => setSelectCountry(e.target.value)}
							className="border rounded-lg px-3 py-2 text-sm bg-theme-input text-theme-muted font-bold focus:outline-none w-full cursor-pointer"
						>
							{groupedCurrencies.map(group => (
								<optgroup
									key={group.region}
									label={group.region}
									className="text-theme-strong font-bold"
								>
									{group.currencies.map(currency => (
										<option
											key={currency.code}
											value={currency.code}
											className="text-theme-muted"
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
						<label className="text-[10px] lg:text-xs font-bold text-theme-muted uppercase tracking-wide px-1">
							Amount ({selectCountry})
						</label>

						{/* currency input with symbol */}
						<div className="relative flex items-center">
							<span className="absolute left-3 text-sm lg:text-base font-bold text-theme-muted pointer-events-none select-none">
								{activeSymbol}
							</span>
							<input
								type="text"
								inputMode="decimal"
								// Adds the contextual active symbol to the helper placeholder string
								placeholder={`0.00`}
								value={amount}
								onChange={(e) => handleAmountChange(e.target.value)}
								// Added padding-left (pl-9 or adjustments depending on symbol widths) to make space for the symbol overlay token
								className="border rounded-lg pr-3 py-2 text-base lg:text-lg bg-theme-input text-theme-strong w-full focus:outline-none focus:ring-1 pl-10 font-bold"
							/>
						</div>
					</div>

					{/* Short, clean divider arrow */}
					<div className="text-xs font-bold text-theme-muted px-1 py-1">↓ converts to</div>

					{/* Result Block */}
					<div className="flex items-center justify-between p-3 lg:p-4 bg-theme-muted-10 rounded-xl border border-theme-muted">
						<span className="text-xs font-bold text-theme-strong uppercase tracking-wider">
							Total Estimation
						</span>
						<span className="text-xl lg:text-2xl font-black text-theme-strong">
							RM {result}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
