import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ServiceUnavailable() {

return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
			<div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-full text-red-500 mb-6 animate-pulse">
				<FontAwesomeIcon icon={faExclamation} className="w-12 h-12" />
			</div>

			<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
				Service Temporarily Unavailable
			</h1>

			<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
				We are having trouble connecting to the Bank Negara Malaysia (BNM) currency servers. Please try again in a few moments.
			</p>
		</div>
	);
}
