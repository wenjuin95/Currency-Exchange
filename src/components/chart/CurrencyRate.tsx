import { useEffect, useState } from "react"
import { getExchangeRate } from "@/lib/api"
import { countryNames } from "@/lib/country_code"

export default function CurrencyRate() {
	const [currencies, setCurrencies] = useState<{ country: string,code: string, rate: number }[]>([])
	const half = Math.ceil(currencies.length / 2);
	const leftColumnData = currencies.slice(0, half);
	const rightColumnData = currencies.slice(half);

	useEffect(() => {
		const countryCodeToName = (code: string) => {
			return countryNames[code] || code
		}

		async function fetchData() {
			const exchangeRateData = await getExchangeRate()
			if (exchangeRateData) {
				const exchangeRateList = typeof exchangeRateData === "string"
					? JSON.parse(exchangeRateData)
					: exchangeRateData

				const exchangeRate = exchangeRateList.data.map((item: { currency_code: string, rate: { middle_rate: string } }) => {
					return {
						country: countryCodeToName(item.currency_code),
						code: item.currency_code,
						rate: parseFloat(item.rate.middle_rate).toFixed(2)
					}
				})

				setCurrencies(exchangeRate)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
			<div>
				<div className="grid grid-cols-3 gap-x-4 pb-2 text-xs font-semibold text-gray-400 px-2">
					<div>country</div>
					<div>code</div>
					<div>rate</div>
				</div>
				{leftColumnData.map((currency, index) => (
					<div
						key={`left-${index}`}
						className="
							grid grid-cols-3 gap-x-4 py-2 px-2 my-2 border border-black/5 rounded-lg items-center
							text-sm font-bold text-black bg-black/5"
					>
						<div>{currency.country}</div>
						<div>{currency.code}</div>
						<div>{currency.rate}</div>
					</div>
				))}
			</div>
			<div>
				<div className="hidden lg:grid grid-cols-3 gap-x-4 pb-2 text-xs font-semibold text-gray-400 px-2">
					<div>country</div>
					<div>code</div>
					<div>rate</div>
				</div>
				{rightColumnData.map((currency, index) => (
					<div
						key={`right-${index}`}
						className="grid grid-cols-3 gap-x-4 py-2 px-2 my-2 border border-black/5 rounded-lg items-center text-sm font-bold text-black bg-black/5"
					>
						<div>{currency.country}</div>
						<div>{currency.code}</div>
						<div>{currency.rate}</div>
					</div>
				))}
			</div>
		</div>
	)
}
