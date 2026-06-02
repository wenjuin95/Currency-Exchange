import { useState, useEffect } from "react"
import CurrencyRate from "@/components/overview/CurrencyRate"
import SelectionChart from "@/components/overview/SelectionChart"
import ViewToggleNavigation from "@/components/overview/ViewToggleNavigation";
import { HelperFunction } from "@/utils/helperFunction";
import { ViewType } from "@/lib/types"

export default function Overview() {
	const [activeView, setActiveView] = useState<ViewType>("rates")
	const [updateDate, setUpdateDate] = useState<Date | null>(null)

	useEffect(() => {
		async function updateDate() {
			const lastestDate = await HelperFunction.getlastetUpdateDate();
			setUpdateDate(lastestDate)
		}
		updateDate()
	}, [])


	return (
		<div className="p-5">
			<div className="flex items-center justify-between gap-x-4">
				<h2>Exchange Rate Overview</h2>


				<div className="flex items-center gap-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
					{/*<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
					<p className="font-semibold text-sm">
						{updateDate
							? `Last Updated: ${updateDate?.getDate()}/${updateDate?.getMonth() !== undefined ? updateDate.getMonth() + 1 : ''}/${updateDate?.getFullYear()} (${updateDate?.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})})`
							: "Loading..."
						}
					</p>*/}
					{updateDate ? (
						<>
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
							<p className="font-semibold text-sm">
								Last Updated: {updateDate?.getDate()}/{updateDate?.getMonth() !== undefined ? updateDate.getMonth() + 1 : ''}/{updateDate?.getFullYear()} ({updateDate?.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})})
							</p>
						</>
					):(
						<p className="font-semibold text-sm">Loading...</p>
					)}
				</div>
			</div>

			<ViewToggleNavigation activeView={activeView} onViewChange={setActiveView} />

			<div className="mt-6 transition-all duration-300">
				{activeView === "rates" ? (
					<CurrencyRate />
				):(
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
						<SelectionChart defaultCurrency="USD" />
						<SelectionChart defaultCurrency="SGD" />
					</div>
				)}
			</div>
		</div>
	)
}
