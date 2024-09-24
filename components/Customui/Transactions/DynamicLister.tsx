"use client";
import TransactionLink from "./TransactionLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, Transaction } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionsFilter } from "./Filter";
import { FormattedCurrency } from "@/lib/constants";

const DynamicLister = ({ data }: { data: Transaction[] }) => {
    const params = useSearchParams();
    const amountParams: string | null = params.get("amount");
    const Router = useRouter();


    const filterAndSortTransactions = (data: Transaction[], amountParams: string | null) => {
        if (amountParams === "all") {
            return {
                filteredData: data,
                totalAmount: data.reduce((sum, transaction) => sum + transaction.amount, 0)
            };
        }

        let result = [...data];

        if (amountParams) {
            result = result.sort((a, b) => {
                if (amountParams === "asc") {
                    return a.amount - b.amount;
                } else if (amountParams === "desc") {
                    return b.amount - a.amount;
                }
                return 0;
            });
        }

        const totalAmount = result.reduce((sum, transaction) => sum + transaction.amount, 0);

        return { filteredData: result, totalAmount };
    }

    const { filteredData, totalAmount } = useMemo(() =>
        filterAndSortTransactions(data, amountParams),
        [data, amountParams]);
    if (!data || data.length === 0) {
        return (
            <div className='w-full flex flex-col gap-8 '>
                <p className='text-center text-xl'>No transactions found.</p>
                <Button
                    className={cn("mx-auto")}
                    onClick={() => Router.push("/new-transaction")}>
                    Add transaction
                    <span className='ml-2'>
                        <PackagePlus className='w-5 h-5 text-orange-500' />
                    </span>
                </Button>
            </div>
        );
    }

    return (
        <div className='w-full mx-auto flex flex-col gap-4 px-4'>
            <p className="text-left text-lg font-bold">Total Amount: {
                FormattedCurrency(totalAmount, 'KES')
            }</p>
            <div className='w-full mx-auto px-2 flex items-center'>

                <TransactionsFilter />
            </div>

            <ScrollArea
                className={cn("mx-auto w-full flex flex-col gap-6 px-2 ")}>
                {filteredData && filteredData?.length > 0 ? (
                    filteredData?.map((transaction) => (
                        <Suspense
                            key={transaction.id}
                            fallback={<div>Loading...</div>}>
                            <TransactionLink transaction={transaction} />
                            <Separator className='my-2 dark:bg-transparent' />
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
export default DynamicLister;