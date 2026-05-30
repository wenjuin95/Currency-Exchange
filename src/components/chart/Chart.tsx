import CurrencyRate from "@/components/chart/CurrencyRate"
import UsdChart from "@/components/chart/UsdChart"

export default function Chart() {

	return (
		<div className="p-5">
			<h1>Chart</h1>
			<CurrencyRate />
			<UsdChart />
		</div>
	)
}
