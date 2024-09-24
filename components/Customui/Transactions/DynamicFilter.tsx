'use client'
import React from 'react'
import { validCategories } from '@/lib/constants'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';



const DynamicFilter = ({ type }: { type: string }) => {
    const categories = validCategories[type as keyof typeof validCategories]

    console.log(categories)

    const searchParams = useSearchParams();
    const amountsortparams = searchParams.get("amount");
    const { replace } = useRouter();
    const pathname = usePathname();

    // : check if any of the search params are present in the url
    function paramFilterbyItem(item: string) {
        if (item === "amount") {
            return amountsortparams;
        }
        return null;
    }
    // updates params
    function handleSearchParams(paramItem: string, paramValue: string) {
        const params = new URLSearchParams(searchParams);

        const passedParamFilter = paramFilterbyItem(paramItem);

        if (!passedParamFilter) {
            // does exist at all
            params.set(paramItem, paramValue);
        } else if (paramValue === passedParamFilter) {
            // passed param is the same as the one in the url
            params.delete(paramItem);
        } else {
            // passed param is different from the one in the url buy of same item so replace
            params.set(paramItem, paramValue);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }



    return (
        <ScrollArea className='w-full whitespace-nowrap rounded-md border spacing-x-4 mx-auto'>
            <div className='mx-auto flex w-max space-x-4 p-3 text-white dark:text-cyan-400 transition-all ease-linear'>
                <Badge
                    className={`cursor-pointer hover:bg-lime-300 transition-all ease-linear ${amountsortparams === "asc" ? "bg-lime-400 hover:bg-sky-900" : ""}`}
                    onClick={() => handleSearchParams("amount", "asc")}>
                    Amount <ArrowUp className='text-base' />
                </Badge>
                <Badge
                    className={`cursor-pointer hover:bg-lime-300 transition-all ease-linear ${amountsortparams === "desc" ? "bg-lime-400 hover:bg-sky-900" : ""}`}
                    onClick={() => handleSearchParams("amount", "desc")}>
                    Amount <ArrowDown className='text-base' />
                </Badge>
            </div>
        </ScrollArea>
    )
}
export default DynamicFilter