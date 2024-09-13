import React from "react";
import {
	ArrowDownToLine,
	ArrowLeftRight,
	ArrowUpToLine,
	PackagePlus,
	WalletMinimal,
} from "lucide-react";
import Link from "next/link";

const TransactionLink = ({ transaction }: { transaction: any }) => {
	const renderIcon = (type: string) => {
		switch (type) {
			case "expense":
				return <ArrowDownToLine className='w-5 h-5 text-red-500' />;
			case "income":
				return <ArrowUpToLine className='w-5 h-5 text-lime-800' />;
			case "saving":
				return <WalletMinimal className='w-5 h-5 text-blue-500' />;
			case "transfer":
				return <ArrowLeftRight className='w-5 h-5 text-cyan-500' />;
			case "investment":
				return <PackagePlus className='w-5 h-5 text-orange-500' />;

			default:
				return null;
		}
	};

	const {
		id,
    date,
    amount,
    type,
    category,
    description,
	} = transaction;

	return (
		<Link
			href={`/transactions/${id}`}
			className=' w-full shadow-sm rounded-md flex justify-between items-center gap-2 py-2 px-4 hover:shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all ease-linear cursor-pointer'>
			<div className='flex gap-4 items-center'>
				<div className='w-fit flex items-center justify-between rounded-full bg-slate-300 dark:bg-sky-950 p-2'>
					{renderIcon(type)}
				</div>

				<div className='flex flex-col'>
					<p className='text-base font-semibold'>{category}</p>
					<p className='text-xs md:hidden  text-slate-500 '>
						{/* cut descrption to 3 words and add... */}
						{description.split(" ").slice(0, 3).join(" ")}...
					</p>
					<p className='text-xs hidden md:inline-block  text-slate-500 '>
						{description}
					</p>
				</div>
			</div>
			<div className='flex flex-col'>
				<p className='text-lg font-bold'>{amount}</p>
				<p className='text-xs text-muted-foreground opacity-70 dark:opacity-45 '>
					{date}
				</p>
			</div>
		</Link>
	);
};

export default TransactionLink;