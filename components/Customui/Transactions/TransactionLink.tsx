import React from "react";
import {
	ArrowDownToLine,
	ArrowLeftRight,
	ArrowUpToLine,
	PackagePlus,
	WalletMinimal,
	ShoppingCartIcon,
	LucideDroplets,
	UtilityPole,
	HouseIcon,
	HeartPulseIcon,
	Banknote,
	ChartCandlestickIcon,
	Church,
	Gamepad2Icon,
	EthernetPortIcon,
	TrendingUp,
	GiftIcon,
	WrenchIcon,
	ArrowLeftRightIcon,
	GraduationCapIcon,
	Bus,
	PlaneIcon,
	BanknoteIcon,
	PercentIcon,
	PlugZapIcon,
	SaveAllIcon,
	Replace,
} from "lucide-react";
import Link from "next/link";
type Transaction = {
	id: string;
	transactiondate: Date;
	amount: number;
	type: string;
	category: string;
	description: string;
};

// date  format from fns
import { formatDistanceToNow } from "date-fns";
import { FormattedCurrency } from "@/lib/constants";

const TransactionLink = ({ transaction }: {
	transaction: Transaction;
}) => {
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


	const renderCategoryIcon = (category: string) => {
		switch (category) {
			case "shopping":
				return <ShoppingCartIcon className='w-5 h-5 text-red-500' />;
			case "transport":
				return <Bus className='w-5 h-5 text-blue-300' />;
			case "housing":
				return <HouseIcon className='w-5 h-5 text-green-5' />;
			case "healthcare":
				return <HeartPulseIcon className='w-5 h-5 text-green-500' />;
			case "utilities":
				return <WrenchIcon className='w-5 h-5 text-yellow-500' />;
			case "entertainment":
				return <ChartCandlestickIcon className='w-5 h-5 text-purple-500' />;
			case "education":
				return <GraduationCapIcon className='w-5 h-5 text-pink-500' />;
			case "gift":
				return <GiftIcon className='w-5 h-5 text-pink-800' />;
			case "gaming":
				return <Gamepad2Icon className='w-5 h-5 text-red-500' />;
			case "internet":
				return <EthernetPortIcon className='w-5 h-5 text-purple-500' />;
			case "travel":
				return <PlaneIcon className='w-5 h-5 text-yellow-500' />;
			case "water bill":
				return <LucideDroplets className='w-5 h-5 text-blue-500' />;
			case "power bill":
				return <UtilityPole className='w-5 h-5 text-pink-500' />;
			case "transportation":
				return <Bus className='w-5 h-5 text-blue-500' />;
			case "rent":
				return <HouseIcon className='w-5 h-5 text-pink-500' />;
			case "church":
				return <Church className='w-5 h-5 text-cyan-700' />;
			case "asset purchase":
				return <TrendingUp className='w-5 h-5 text-pink-500' />;
			case "salary":
				return <BanknoteIcon className='w-5 h-5 text-lime-500' />;
			case "bonus":
				return <GiftIcon className='w-5 h-5 text-pink-500' />;
			case "interest":
				return <PercentIcon className='w-5 h-5 text-lime-800' />;
			case "refund":
				return <ArrowLeftRightIcon className='w-5 h-5 text-yellow-500' />;
			case "freelance":
				return <PlugZapIcon className='w-5 h-5 text-pink-500' />;
			case "investment":
				return <SaveAllIcon className='w-5 h-5 text-fuchsia-400' />;
			case "transfer":
				return <Replace className='w-5 h-5 text-cyan-500' />;
			default:
				return <Banknote className='w-5 h-5 text-pink-700' />;
		}
	}





	const {
		id,
		transactiondate,
		amount,
		type,
		category,
		description,
	} = transaction;

	const formattedDate = formatDistanceToNow(new Date(transactiondate), {
		addSuffix: true,
	});

	return (
		<Link
			href={`/transactions/${id}`}
			className=' w-full shadow-sm rounded-md flex justify-between items-center gap-2 p-2 hover:shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all ease-linear cursor-pointer'>
			<div className='flex gap-4 items-center'>
				<div className='w-fit flex items-center justify-between rounded-full bg-slate-300 dark:bg-sky-950 p-2'>
					{
						(type === "expense" || "income") ? renderCategoryIcon(category) : renderIcon(type)
					}
				</div>

				<div className='flex flex-col'>
					<p className='text-base font-semibold'>{category}</p>
					<p className='text-xs md:hidden  text-muted-foreground '>
						{description.split(" ").slice(0, 2)}...
					</p>
					<p className='text-xs hidden md:inline-block  text-slate-500 '>
						{description}
					</p>
				</div>
			</div>
			<div className='flex flex-col self-end text-right'>
				<p className='text-sm font-semibold'>{
					FormattedCurrency(amount, 'KES')
				}</p>
				<p className='text-xs italic text-muted-foreground opacity-70 dark:opacity-45 '>
					{formattedDate}
				</p>
			</div>
		</Link>
	);

};
export default TransactionLink;