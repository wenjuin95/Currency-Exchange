import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
	return (
		<footer className="w-full border-t border-black/5 dark:border-white/10 px-4 sm:px-6 py-6 mt-12 text-theme-muted">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4">

                {/* Clean, tracking-wide copyright text */}
                <div className="text-xs sm:text-sm tracking-wide text-center sm:text-left">
                    &copy; {new Date().getFullYear()}{" "}
                    <span className="font-semibold">LOW WEN JUIN</span>.
                    All rights reserved.
                </div>

                {/* Elegant social link with subtle transition properties */}
                <div className="flex items-center gap-x-4">
                    <a
                        href="https://github.com/wenjuin95/MYR-Currency-Exchange"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-x-2 text-sm font-medium text-theme-muted hover:text-black dark:hover:text-white transition-colors duration-200 group"
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-xl text-theme-muted group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
                        <span>Source Code</span>
                    </a>
                </div>

            </div>
        </footer>
	)
}
