"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
const ThemeToogle = () => {
	const { setTheme, theme } = useTheme();
	return (
		<Button
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className='cursor-pointer min-w-fit rounded-full ring-0 outline-none hover:bg-transparent flex-1'
			variant='ghost'>
			{theme === "light" ? (
				<MoonIcon className='w-6 h-6 text-amber-300' />
			) : (
				<SunIcon className='w-6 h-6 text-white' />
			)}
		</Button>
	);
};

export default ThemeToogle;