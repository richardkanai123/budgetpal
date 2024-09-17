import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import {
	Card, CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "../ui/card";
import { auth } from "@/Auth";
import { summarizeTransactions } from "@/lib/helpers";
import { FormattedCurrency } from "@/lib/constants";

const BalanceCard = async () => {
	const session = await auth()

	if (!session) {
		return (
			<div className='w-full flex flex-col gap-8 '>
				<p className='text-center text-xl'>No transactions found.</p>
			</div>
		)
	}

	const { data, success } = await summarizeTransactions()

	if (!success) {
		return (
			<div className='w-full flex flex-col gap-8 '>
				<p className='text-center text-xl'>No transactions found.</p>
			</div>
		)
	}

	if (success && (!data || data.length === 0)) {
		return (
			<div className='w-full flex flex-col gap-8 '>
				<p className='text-center text-xl'>No transactions found.</p>
			</div>
		)
	}

	if (data && success) {
		const totalIncome = data?.find(ts => ts.type === "income")?.totalAmount || 0
		const totalExpense = data?.find(ts => ts.type === "expense")?.totalAmount || 0
		const totalSaving = data?.find(ts => ts.type === "saving")?.totalAmount || 0
		const totalInvestment = data?.find(ts => ts.type === "investment")?.totalAmount || 0
		const totalBalance = (totalIncome as number) - (totalExpense as number) - (totalSaving as number) - (totalInvestment as number)


		return (
			<Card
				className={cn(
					"w-full max-w-[400px] mx-auto ring-0 outline-none  shadow-sm hover:shadow-md transition-all ease-linear duration-100"
				)}
				x-chunk='balance-card'>
				<CardHeader className='pb-2'>
					<CardDescription className='text-xs'>Hello {session?.user?.name} </CardDescription>
					<CardTitle className='text-4xl text-center'>
						{FormattedCurrency(totalBalance, 'KES')}
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex align-middle justify-between text-center">
					<div className="flex-1">
						<p className='text-base font-semibold  text-lime-500'>Income: {FormattedCurrency(totalIncome as number, 'KES')}</p>
					</div>
					<div className="flex-1">
						<p className='text-base font-semibold text-yellow-300'>Expense: {FormattedCurrency(totalExpense as number, 'KES')}</p>
					</div>
				</CardContent>
				<CardFooter>
					<Progress
						value={25}
						aria-label='25% increase'
					/>
				</CardFooter>
			</Card >
		);
	}
};

export default BalanceCard;