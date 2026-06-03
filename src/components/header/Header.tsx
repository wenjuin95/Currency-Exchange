import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
	return (
		<div className="p-5">
			<div className="flex items-center gap-x-4">
				<h1 className=""> Malaysia Exchange Rate </h1>
				<div>
					<DarkModeToggle />
				</div>
			</div>
			<p>dashboard for tracking daily currency rates and conversions</p>
		</div>
	)
}
