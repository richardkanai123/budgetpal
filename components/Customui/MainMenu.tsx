import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
	ArrowDownToLine,
	ArrowUpToLine,
	ClipboardPlus,
	// Handshake,
	WalletMinimal,
} from "lucide-react";
import Link from "next/link";


type LinkType = {
	tag: string;
	url: string;
	icon: React.JSX.Element;
};

const MainMenu = () => {
	const Links: LinkType[] = [
		{
			tag: "NEW",
			url: "/new-transaction",
			icon: <ClipboardPlus className='w-12 h-12' />,
		},
		{
			tag: "Income",
			url: "/reports/income",
			icon: <ArrowUpToLine className='w-12 h-12' />,
		},
		{
			tag: "Savings",
			url: "/reports/saving",
			icon: <WalletMinimal className='w-12 h-12' />,
		},
		{
			tag: "Expenses",
			url: "/reports/expense",
			icon: <ArrowDownToLine className='w-12 h-12' />,
		},
		// {
		// 	tag: "Debt",
		// 	url: "/reports/debt",
		// 	icon: <Handshake className='w-12 h-12' />,
		// },
		// {
		// 	tag: "Monthly",
		// 	url: "/reports/monthly",
		// 	icon: <CalendarRangeIcon className='w-10 h-10' />,
		// },
	];

	// change link colors depending on tag
	const changeLinkColor = (link: LinkType) => {
		if (link.tag === "NEW") {
			return " flex flex-col items-center hover:bg-cyan-500 p-2 rounded-full w-15 h-16 text-lime-700";
		} else if (link.tag === "Income") {
			return "flex flex-col items-center hover:bg-primary p-2 rounded-full w-15 h-16 text-green-700";
		} else if (link.tag === "Savings") {
			return "flex flex-col items-center hover:bg-primary p-2 rounded-full w-15 h-16 text-yellow-700";
		} else if (link.tag === "Expenses") {
			return "flex flex-col items-center hover:bg-primary p-2 rounded-full w-15 h-16 text-cyan-700";
		} else if (link.tag === "Debt") {
			return "flex flex-col items-center hover:bg-primary p-2 rounded-full w-15 h-16 text-orange-700";
		} else if (link.tag === "Monthly") {
			return "flex flex-col items-center hover:bg-primary p-2 rounded-full w-15 h-16 text-blue-700";
		}
	};

	return (
		<div className='w-full my-4 mx-auto'>
			<ScrollArea className='w-full whitespace-nowrap rounded-md border mx-auto'>
				{/* quick nav scrolling x-axis */}
				<div className='mx-auto flex w-max space-x-3'>
					{Links.map((link) => (
						<Link
							href={link.url}
							className={changeLinkColor(link)}
							key={link.tag}>
							{link.icon}
							<span className='text-xs font-semibold'>{link.tag}</span>
						</Link>
					))}
				</div>

				<ScrollBar orientation='horizontal' />
			</ScrollArea>
		</div>
	);
};

export default MainMenu;