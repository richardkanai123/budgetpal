import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import {
	Card, CardContent,
	CardDescription,
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
		const totalBalance = (totalIncome as number) - ((totalExpense as number) + (totalSaving as number) + (totalInvestment as number))

		const ExpensePercentage = (totalExpense / totalIncome) * 100
		const SavingPercentage = (totalSaving / totalIncome) * 100
		const InvestmentPercentage = (totalInvestment / totalIncome) * 100
		const BalancePercentage = (totalBalance / totalIncome) * 100



		return (
			<Card
				className={cn(
					"w-full max-w-[400px] mx-auto ring-0 outline-none  shadow-sm hover:shadow-md transition-all ease-linear duration-100"
				)}
				x-chunk='balance-card'>
				<CardHeader className='pb-2'>
					<CardDescription className='text-xs'>Balance </CardDescription>
					<CardTitle className='text-4xl font-semibold  text-center'>
						{FormattedCurrency(totalBalance, 'KES')}
					</CardTitle>
					<Progress value={Math.round(BalancePercentage)} className="w-full  animate-in fade-in-60 duration-[5000]" />
				</CardHeader>
				<CardContent className="w-full ">
					<div className="w-full flex align-middle justify-between text-center">
						<div className="flex-1">
							<p className='text-base font-semibold  text-lime-500'>Income: <br /> {FormattedCurrency(totalIncome as number, 'KES')}</p>
						</div>
						<div className="flex-1">
							<p className='text-base font-semibold text-yellow-300'>Expense: <br /> {FormattedCurrency(totalExpense as number, 'KES')}</p>
						</div>
					</div>

					<div className="w-full flex text-xs text-muted-foreground justify-around items-center align-middle my-2">
						<span>Expense: {Math.round(ExpensePercentage)}%</span>
						<span>Savings: {Math.round(SavingPercentage)}%</span>
						<span>Investments: {Math.round(InvestmentPercentage)}%</span>
					</div>
				</CardContent>

			</Card >
		);
	}
};

export default BalanceCard;