"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
const ThemeToogle = () => {
	const { setTheme, theme } = useTheme();
	return (
		<Button asChild variant="ghost" size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className='cursor-pointer min-w-fit rounded-full ring-0 outline-none bg-transparent flex-1'>
			<span>
			{theme === "light" ? (
				<MoonIcon className='w-6 h-6 text-amber-300' />
			) : (
				<SunIcon className='w-6 h-6 text-white' />
				)}
				</span>
		</Button>
	);
};

export default ThemeToogle;