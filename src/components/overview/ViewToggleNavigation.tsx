import { ViewToggleNavigationProps } from "@/lib/types"

export default function ViewToggleNavigation({ activeView, onViewChange }: ViewToggleNavigationProps) {
    return (
        <div className="flex gap-1 bg-black/5 p-1 rounded-lg mt-3 w-fit border border-black/5">
            <button
                type="button"
                onClick={() => onViewChange("rates")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    activeView === "rates"
                        ? "bg-black/90 text-white shadow-sm scale-[1.02]"
                        : "text-gray-600 hover:text-black/90 hover:bg-black/5"
                }`}
            >
                All Country Rates
            </button>
            <button
                type="button"
                onClick={() => onViewChange("charts")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    activeView === "charts"
                        ? "bg-black/90 text-white shadow-sm scale-[1.02]"
                        : "text-gray-600 hover:text-black/90 hover:bg-black/5"
                }`}
            >
                Currency Charts
            </button>
        </div>
    )
}
