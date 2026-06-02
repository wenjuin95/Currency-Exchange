import Header from "@/components/header/Header"
import CurrencyConverter from "@/components/converter/CurrencyConverter"
import Overview from "@/components/overview/Overview"

function App() {
	return (
		<div className="flex flex-col gap-y-5">
			<Header />
			<CurrencyConverter />
			<Overview />
		</div>
	)
}

export default App
