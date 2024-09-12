import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { Card, CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
 } from "../ui/card";

const BalanceCard = ({ username }: { username: string }) => {
	return (
		<Card
			className={cn(
				"w-full max-w-[400px] mx-auto ring-0 outline-none  shadow-sm hover:shadow-md transition-all ease-linear duration-100"
			)}
			x-chunk='balance-card'>
			<CardHeader className='pb-2'>
				<CardDescription className='text-xs'>Hello {username}</CardDescription>
				<CardTitle className='text-4xl text-center'>KSH. 10,329</CardTitle>
			</CardHeader>
			<CardContent className={cn("flex justify-around")}>
				<p className='text-base font-semibold  text-lime-500'>Income: 3000</p>
				<p className='text-base font-semibold text-yellow-300'>Expense: 5000</p>
			</CardContent>
			<CardFooter>
				<Progress
					value={25}
					aria-label='25% increase'
				/>
			</CardFooter>
		</Card>
	);
};

export default BalanceCard;