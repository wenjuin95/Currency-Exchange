import CurrencyRate from "@/components/chart/CurrencyRate"
import SelectionChart from "@/components/chart/SelectionChart"
import { getExchangeRate } from "@/lib/api"
import { useState, useEffect } from "react"

export default function Chart() {
	const [updateDate, setUpdateDate] = useState<Date | null>(null)

	useEffect(() => {
		async function updateDate() {
			const data = await getExchangeRate()
			if (data) {
				const dataList = typeof data === "string"
					? JSON.parse(data)
					: data
				const updateDate = dataList.meta.last_updated;
				console.log("Last Updated:", updateDate)
				setUpdateDate(new Date(updateDate))
			}
		}

		updateDate()
	}, [])


	return (
		<div className="p-5">
			<div className="flex items-center justify-between gap-x-4">
				<h1>Chart</h1>
				<div className="flex items-center gap-x-2">
					<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
					<p className="font-semibold text-sm">Last Updated:</p>
					<p className="font-semibold text-sm">{updateDate?.getDate()}/{updateDate?.getMonth() !== undefined ? updateDate.getMonth() + 1 : ''}/{updateDate?.getFullYear()} ({updateDate?.toLocaleTimeString()})</p>
				</div>
			</div>

			<CurrencyRate />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
				<SelectionChart defaultCurrency="USD" />
				<SelectionChart defaultCurrency="SGD" />
			</div>
		</div>
	)
}
