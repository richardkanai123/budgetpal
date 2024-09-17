'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { validCategories } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2Icon } from "lucide-react";
import { AddNewTransaction } from "@/lib/helpers";


// form schema
const formSchema = z
    .object({
        description: z.string().min(5, {
            message: "Note must be at least 5 characters.",
        }),
        transactionDate: z
            .date({
                required_error: "A date of transaction is required.",
            })
            .max(new Date(), {
                message: "Transaction date must be in the past.",
            }),
        amount: z.number().min(0, {
            message: "Amount must be greater than 0.",
        }),
        type: z.enum(["expense", "income", "saving", "investment"], {
            required_error: "Transaction type is required.",
            message:
                "Transaction type must be either expense, income, saving, or investment.",
        }),
        category: z.string(),
    })
    .refine(
        (data) => {
            const validCategoriesForType = validCategories[data.type];
            return validCategoriesForType.includes(data.category);
        },
        {
            message: "Invalid category for the selected transaction type.",
            path: ["category"],
        },
    );


export default function NewTransaction() {

    // router
    const Router = useRouter();

    // toast initiation
    const { toast } = useToast();

    // form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            type: "expense",
        }
    })


    // form submit
    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(JSON.stringify(data))
        try {
            const response = await AddNewTransaction(data)
            if (response.success) {
                toast({
                    title: "Transaction added successfully",
                    description: "Transaction added successfully",
                    duration: 2000,
                    variant: "default",
                });

                form.reset();
                Router.push('/new-transaction/success')
            }
            else {
                form.setError("root", {
                    type: "server",
                    message: response.message,
                })
                toast({
                    title: "Transaction failed",
                    description: response.message,
                    duration: 2000,
                    variant: "destructive",
                });
            }

        }
        catch (error) {
            toast({
                title: "Transaction failed",
                description: 'Unexpected error!',
                duration: 2000,
                variant: "destructive",
            })

        }

    }



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full max-w-[500px] space-y-6 mx-auto overflow-hidden px-2'>
                <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input
                                    className='max-w-[400px] rounded-none'
                                    type='number'
                                    {...field}
                                    onChange={(event) => field.onChange(+event.target.value)}
                                />
                            </FormControl>
                            <FormDescription>Amount of the transaction.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='transactionDate'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Transaction Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                            )}>
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='w-auto p-0'
                                    align='start'>
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>Date of the transaction.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem className='space-y-3'>
                            <FormLabel>Select transaction type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-col space-y-1'>
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='income' />
                                        </FormControl>
                                        <FormLabel className='font-normal'>Income</FormLabel>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='expense' />
                                        </FormControl>
                                        <FormLabel className='font-normal'>Expense</FormLabel>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='saving' />
                                        </FormControl>
                                        <FormLabel className='font-normal'>Savings</FormLabel>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='investment' />
                                        </FormControl>
                                        <FormLabel className='font-normal'>Investment</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* category depending on transaction type */}
                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormDescription>
                                Select a category based on the transaction type.
                            </FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-col space-y-1'>
                                    {validCategories[form.watch("type")].map(
                                        (category) => (
                                            <FormItem
                                                key={category}
                                                className='flex items-center space-x-3 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem value={category} />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {category}
                                                </FormLabel>
                                            </FormItem>
                                        ),
                                    )}
                                </RadioGroup>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={cn("text-lg")}>Note</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Transaction note eg. "Paycheck, loan payment, etc."'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is a brief statement about the transaction.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    form.formState.errors.root && <p className=" text-center my-3 text-sm text-red-400">
                        {form.formState.errors.root.message}
                    </p>

                }

                <Button
                    disabled={form.formState.isSubmitting || form.formState.isValidating}
                    type='submit'>
                    {form.formState.isSubmitting && (
                        <Loader2Icon className='animate-spin mr-2 h-4 w-4' />
                    )}
                    {form.formState.isSubmitting ? "Loading ..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
