'use server'

import { signIn as naSignIn, signOut as naSignOut } from "@/Auth"
import { AuthError } from "next-auth"
import prisma from "./prisma"
import { auth } from "@/Auth"
import { revalidatePath } from "next/cache"
import { Transaction } from "@prisma/client"

export async function signIn() {
    await naSignIn()
}

export async function signOut() {
    await naSignOut()
}

// sign in with credentials
export async function signInWithCredentials(values: FormData): Promise<{
    success: boolean;
    error: string;
}> {
    const email = values.get('email') as string
    const password = values.get('password') as string


    try {
        await naSignIn('credentials', {
            email,
            password,
            redirect: false,
        })

        return {
            success: true,
            error: "no error"
        }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': {
                    return {
                        success: false,
                        error: 'Invalid email or password!'
                    }
                }
                case 'MissingCSRF': {
                    return {
                        success: false,
                        error: 'Auth configuration error!'
                    }
                }
                case 'CallbackRouteError': {
                    return {
                        success: false,
                        error: 'Wrong password!'
                    }
                }
                case 'EmailSignInError': {
                    return {
                        success: false,
                        error: 'Invalid  email or password!'
                    }
                }
                default:
                    return {
                        success: false,
                        error: 'Server error!'
                    }
            }
        }
        // Add a default return statement for cases where error is not an instance of AuthError
        return {
            success: false,
            error: 'An unexpected error occurred'
        }
    }
}

// register user
export async function registerUser(values: FormData) {
    const username = values.get('username') as string
    const email = values.get('email') as string
    const password = values.get('password') as string
    const confirmPassword = values.get('confirmpassword') as string


    try {

        if (password !== confirmPassword) {
            return {
                success: false,
                error: 'Passwords do not match',
                status: 400,
            }
        }

        const usersURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`

        const Response = await fetch(usersURL, {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await Response.json()
        if (Response.status === 201) {
            return {
                success: true,
                message: data.message,
                status: 201,
            }
        } else
            return {
                success: false,
                error: data.message,
                status: Response.status,
            }

    } catch (error) {
        return {
            success: false,
            error: 'Something went wrong',
            status: 500,
        }
    }

}


// Reset user password
export async function resetPassword(values: {
    email: string;
    password: string;
    confirmPassword: string;
}) {
    const { email, password, confirmPassword } = values
    if (password !== confirmPassword) {
        return {
            success: false,
            message: 'Passwords do not match',
            status: 400,
        }
    }

    try {
        const usersURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/reset-password`

        if (!usersURL) {
            return {
                success: false,
                message: 'Something went wrong',
                status: 500,
            }
        }

        const Response = await fetch(usersURL, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                confirmPassword,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await Response.json()

        if (Response.status === 200) {
            return {
                success: true,
                message: data.message as string,
                status: 200,
            }
        } else
            return {
                success: false,
                message: data.message as string,
                status: Response.status,
            }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                status: 500,
            }
        } else
            return {
                success: false,
                message: 'Something went wrong',
                status: 500,
            }
    }
}





// Add new Transaction

type UserTransactionInput = {
    description: string;
    transactionDate: Date;
    amount: number;
    type: "expense" | "income" | "saving" | "investment";
    category: string;
}

export async function AddNewTransaction(data: UserTransactionInput): Promise<{
    success: boolean;
    message: string;
    status: number;
}> {
    // const TransactionsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction`

    if (!data.description || !data.transactionDate || !data.amount || !data.type || !data.category) {
        return {
            success: false,
            message: 'All fields are required',
            status: 400,
        }
    }

    try {
        const session = await auth()
        const newTransaction = await prisma.transaction.create({
            data: {
                description: data.description,
                amount: data.amount,
                type: data.type,
                category: data.category,
                transactiondate: data.transactionDate,
                userId: session?.user?.id as string,
            }
        })

        if (!newTransaction) {
            return {
                success: false,
                message: 'Transaction creation failed',
                status: 500,
            }
        }

        revalidatePath('/')

        return {
            success: true,
            message: 'Transaction created successfully',
            status: 201,
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                status: 500,
            }
        }
        else {
            return {
                success: false,
                message: 'An unexpected error occurred',
                status: 500,
            }
        }
    }
}

// fetch all transactions
export async function fetchAllTransactions() {
    try {
        const session = await auth()
        if (!session) {
            return {
                success: false,
                message: 'Unauthorized',
                status: 401,
                data: null,
            }
        }

        const data = await prisma.transaction.findMany({
            where: {
                userId: session?.user?.id as string,
            },
            orderBy: {
                transactiondate: 'desc',
            }

        })
        if (!data) {
            return {
                success: false,
                message: 'No transactions found',
                status: 404,
                data: null,
            }
        }

        return {
            success: true,
            data: data,
            status: 200,
            message: 'Transactions fetched successfully',
        }
    } catch (error) {

        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                status: 500,
                data: null,
            }
        }
        else {
            return {
                success: false,
                message: 'An unexpected error occurred',
                status: 500,
                data: null,
            }
        }
    }
}


// gets recent transactions 
export async function getRecentTransactions() {
    try {
        const session = await auth()
        if (!session) {
            return {
                success: false,
                message: 'Unauthorized',
                status: 401,
                data: null,
            }
        }

        const data = await prisma.transaction.findMany({
            take: 5,
            where: {
                userId: session?.user?.id as string,
            },
            orderBy: {
                transactiondate: 'desc',
            }

        })
        if (!data) {
            return {
                success: false,
                message: 'No transactions found',
                status: 404,
                data: null,
            }
        }
        return {
            success: true,
            data: data,
            status: 200,
            message: 'Transactions fetched successfully',
        }
    } catch (error) {

        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                status: 500,
                data: null,
            }
        }
        else {
            return {
                success: false,
                message: 'An unexpected error occurred',
                status: 500,
                data: null,
            }
        }
    }
}


// Summarize transaction amounts into categories
export async function summarizeTransactions() {
    const AllTransactions = await fetchAllTransactions()

    if (!AllTransactions.success) {
        return {
            success: false,
            message: 'Failed to fetch transactions',
            status: 500,
            data: null,
        }
    }

    // success but no transactions for this user
    if (AllTransactions.success && (!AllTransactions.data || AllTransactions.data.length === 0)) {
        return {
            success: true,
            message: 'No transactions found',
            status: 200,
            data: null
        }
    }

    const transactions = AllTransactions.data as Transaction[]
    const types = transactions.map(transaction => transaction.type)
    const UniqueTypes = Array.from(new Set(types))
    const summarizedTransactions = UniqueTypes.map(type => {
        const typeTransactions = transactions.filter(transaction => transaction.type === type)
        const totalAmount = typeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
        return {
            type: type,
            totalAmount: totalAmount,
        }
    })


    return {
        success: true,
        message: 'Transactions summarized successfully',
        status: 200,
        data: summarizedTransactions,
    }

}


// fetch transactiom given id
export const fetchTransactionById = async (id: string) => {
    try {
        const session = await auth()
        if (!session) {
            return {
                success: false,
                message: 'Unauthorized',
                status: 401,
                data: null,
            }
        }
        const data = await prisma.transaction.findUnique({
            where: {
                id: id, 
                userId: session?.user?.id as string,
            },
        })
        if (!data) {
            return {
                success: false,
                message: 'Transaction not found',
                status: 404,
                data: null,
            }
        }
        return {
            success: true,
            data: data,
            status: 200,
            message: 'Transaction fetched successfully'
        }
        
    } catch (error) {
            if (error instanceof Error) {
                return {
                    success: false,
                    message: error.message,
                    status: 500,
                    data: null,
                }
            }
            else {
                return {
                    success: false,
                    message: 'An unexpected error occurred',
                    status: 500,
                    data: null,
                }
            }
        }
}    

// get transactions given category
export const fetchTransactionsByCategory = async (category: string) => {
    try {
        const session = await auth()
        if (!session) {
            return {
                success: false,
                message: 'Unauthorized',
                status: 401,
                data: null,
            }
        }
            
            const data = await prisma.transaction.findMany({
                where: {
                    userId: session?.user?.id as string,
                    category: category,
                },
            })
            if (!data) {
                return {
                    success: true,
                    message: 'No transactions found',
                    status: 404,
                    data: null,
                }
            }
            return {
                success: true,
                data: data,
                status: 200,
                message: 'Transactions fetched successfully',
            }
        }
    
        catch (error) {
            if (error instanceof Error) {
                return {
                    success: false,
                    message: error.message,
                    status: 500,
                    data: null,
                }
            }
            else {
                return {
                    success: false,
                    message: 'An unexpected error occurred',
                    status: 500,
                    data: null,
                }
            }
        }
    }