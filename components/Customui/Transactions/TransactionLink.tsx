import React from "react";




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
import TransactionIcon from "./IconsRender";

const TransactionLink = ({ transaction }: {
	transaction: Transaction;
}) => {






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
					<TransactionIcon type={type} category={category} />
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