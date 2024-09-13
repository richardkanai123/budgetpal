"use client";
import TransactionLink from "./TransactionLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {  useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionsFilter } from "./Filter";

type Transaction = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    amount: number;
    category: string;
    description: string;
    type: string;
};

const TransactionsLister = ({ data }: { data:Transaction[] }) => {
	const params = useSearchParams();
	const typeParams: string | null = params.get("type");
	const amountParams: string | null = params.get("amount");
	const categoryParams: string | null = params.get("category");
	const Router = useRouter();

	const filteredData = useMemo(() => {
		if (!data) return null;

		let result = data.filter((transaction) => {
			let matches = true;

			if (typeParams) {
				matches = matches && transaction.type === typeParams;
			}
			if (categoryParams) {
				matches = matches && transaction.category === categoryParams;
			}

			return matches;
		});

		if (amountParams) {
			result = result.slice().sort((a, b) => {
				if (amountParams === "asc") {
					return a.amount - b.amount;
				} else if (amountParams === "desc") {
					return b.amount - a.amount;
				}
				return 0;
			});
		}

		return result;
	}, [data, typeParams, amountParams, categoryParams]);

	if (!data || data.length === 0) {
		return (
			<div className='w-full flex flex-col gap-8 '>
				<p className='text-center text-xl'>No transactions found.</p>
				<Button
					className={cn("mx-auto")}
					onClick={() => Router.push("/transactions/new")}>
					Add transaction
					<span className='ml-2'>
						<PackagePlus className='w-5 h-5 text-orange-500' />
					</span>
				</Button>
			</div>
		);
	}

	return (
		<div className='w-full mx-auto flex flex-col gap-4'>
			<div className='w-full mx-auto px-2 flex items-center'>
				<TransactionsFilter />
			</div>

			<ScrollArea
				className={cn("mx-auto w-full flex flex-col gap-6 px-2 max-h-[600px]")}>
				{filteredData && filteredData?.length > 0 ? (
					filteredData?.map((transaction) => (
						<Suspense
							key={transaction.id}
                            fallback={<div>Loading...</div>}>
							<TransactionLink transaction={transaction} />
							<Separator className='my-1 dark:bg-transparent' />
						</Suspense>
					))
				) : (
					<p className='text-lg text-primary text-centre'>
						No data on selected filters
					</p>
				)}
			</ScrollArea>
		</div>
	);
};

export default TransactionsLister;