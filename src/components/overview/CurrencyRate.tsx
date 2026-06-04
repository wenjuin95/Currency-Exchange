import { useCurrencyData } from "@/hooks/useCurrencyData";
import { HelperFunction } from "@/utils/helperFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export default function CurrencyRate() {
	const { regionsData, isLoading } = useCurrencyData();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-theme-muted" />
			</div>
		)
	}

	return (
		// 1. Changed from 'grid' to a fluid 'columns' layout to pack cards tightly
		<div className="columns-1 md:columns-2 gap-6 space-y-6 w-full max-w-7xl animate-fade-in animation-delay-200">
			{regionsData.map((group) => (
				<div
					key={group.region}
					// 2. break-inside-avoid prevents a card from awkwardly splitting in half across columns
					className="break-inside-avoid mb-6 bg-theme-muted/30 border border-white rounded-2xl p-4 sm:p-5 shadow-sm"
				>
					{/* Region Section Header Title */}
					<div className="flex justify-between items-center border-b border-white pb-3 mb-3">
						<h3 className="text-xs font-black uppercase tracking-wider text-theme-strong">
							{group.region}
						</h3>
					</div>

					{/* Table Column Labels Header */}
					<div className="grid grid-cols-4 gap-x-4 pb-1.5 text-[11px] font-bold text-theme-muted uppercase tracking-wider px-2">
						<div>Flag</div>
						<div>Country</div>
						<div className="text-center">Unit / Code</div>
						<div className="text-right">MYR Value</div>
					</div>

					{/* List Row Items */}
					<div className="flex flex-col gap-y-1">
						{group.currencies.map((currency, index) => (
							<div
								key={`${group.region}-${currency.code}-${index}`}
								className="grid grid-cols-4 gap-x-4 py-2.5 px-2 rounded-lg items-center text-sm font-bold text-theme-strong hover:bg-theme-muted-10 transition-colors"
							>
								<HelperFunction.CountryFlag
									currencyCode={currency.code}
									className="w-8 h-8"
								/>
								<div className="text-theme-strong font-semibold">{currency.country}</div>
								<div className="text-center font-mono text-xs text-theme-muted bg-theme-input py-0.5 rounded border border-theme-muted/50">
									{currency.unit.toLocaleString()} {currency.code}
								</div>
								<div className="text-right font-black text-theme-strong">
									RM {Number(currency.rate).toFixed(4)}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
