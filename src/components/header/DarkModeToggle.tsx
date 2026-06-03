import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function DarkModeToggle() {
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		try {
			const stored = localStorage.getItem('theme');
			if (stored === 'dark') setIsDark(true);
			else if (stored === 'light') setIsDark(false);
			else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true);
		} catch (e) {
			// ignore
		}
	}, []);

	useEffect(() => {
		try {
			if (isDark) {
				document.documentElement.classList.add('dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
		} catch (e) {
			// ignore
		}
	}, [isDark]);

	return (
		<button
			aria-pressed={isDark}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			onClick={() => setIsDark(v => !v)}
			className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full p-0.5
						bg-theme-muted-10 border border-theme-muted transition-colors duration-300 ease-in-out focus:outline-none"
		>
			{/* 2. The inner sliding circle knob */}
			<span
				className={`
					flex h-5 w-5 items-center justify-center rounded-full bg-black shadow-md
					transform transition duration-300 ease-in-out mt-[1px]
					${isDark ? 'translate-x-7' : 'translate-x-0'}
				`}
			>
				{/* 3. The Icon nested inside the shifting circle */}
				<FontAwesomeIcon
					icon={isDark ? faMoon : faSun}
					className="text-xs text-theme-bg transition-transform duration-300"
				/>
			</span>
		</button>
	);
}
