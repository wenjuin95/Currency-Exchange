import { useCurrencyData } from "@/hooks/useCurrencyData";

export default function CurrencyRate() {
	const { leftColumnData, rightColumnData } = useCurrencyData();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0 animate-fade-in animation-delay-200">
			<div>
				<div className="grid grid-cols-3 gap-x-4 pb-2 text-xs lg:text-sm font-semibold text-theme-muted px-2 lg:px-4">
					<div>country</div>
					<div>Foreign Unit</div>
					<div className="text-right">MYR</div>
				</div>
				{leftColumnData.map((currency, index) => (
					<div
						key={`left-${index}`}
						className="
							grid grid-cols-3 gap-x-4 py-2 px-2 my-2 border border-theme-muted rounded-lg items-center
							text-sm lg:text-base font-bold text-theme-strong bg-theme-muted
							lg-py-3 lg:px-4 lg:my-3 transition-all"
					>
						<div>{currency.country}</div>
						<div className="font-medium lg:font-semibold">{currency.unit.toLocaleString()} {currency.code}</div>
						<div className="text-right lg:text-lg">{currency.rate}</div>
					</div>
				))}
			</div>
			<div>
				<div className="hidden lg:grid grid-cols-3 gap-x-4 pb-2 text-xs lg:text-sm font-semibold text-theme-muted px-2 lg:px-4">
					<div>country</div>
					<div>Foreign Unit</div>
					<div className="text-right">MYR</div>
				</div>
				{rightColumnData.map((currency, index) => (
					<div
						key={`right-${index}`}
						className="
							grid grid-cols-3 gap-x-4 py-2 px-2 my-2 border border-theme-muted rounded-lg items-center
							text-sm lg:text-base font-bold text-theme-strong bg-theme-muted
							lg-py-3 lg:px-4 lg:my-3"
					>
						<div>{currency.country}</div>
						<div className="font-medium lg:font-semibold">{currency.unit.toLocaleString()} {currency.code}</div>
						<div className="text-right lg:text-lg">{currency.rate}</div>
					</div>
				))}
			</div>
		</div>
	)
}
