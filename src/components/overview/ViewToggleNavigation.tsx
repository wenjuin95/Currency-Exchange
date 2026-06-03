import { ViewToggleNavigationProps } from "@/lib/types"

export default function ViewToggleNavigation({ activeView, onViewChange }: ViewToggleNavigationProps) {
    return (
        <div className="flex gap-1 bg-theme-muted p-1 rounded-lg mt-3 w-fit border border-theme-muted animate-fade-in animation-delay-400">
            <button
                type="button"
                onClick={() => onViewChange("rates")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    activeView === "rates"
                        ? "bg-theme-strong text-white shadow-sm scale-[1.02]"
                        : "text-theme-muted hover:text-theme-strong hover:bg-theme-muted"
                }`}
            >
                All Country Rates
            </button>
            <button
                type="button"
                onClick={() => onViewChange("charts")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    activeView === "charts"
                        ? "bg-theme-strong text-white shadow-sm scale-[1.02]"
                        : "text-theme-muted hover:text-theme-strong hover:bg-theme-muted"
                }`}
            >
                Currency Charts
            </button>
        </div>
    )
}
