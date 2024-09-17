'use server'

import { signIn as naSignIn, signOut as naSignOut } from "@/Auth"
import { AuthError } from "next-auth"
import prisma from "./prisma"
import { auth } from "@/Auth"
import { revalidatePath } from "next/cache"

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

    console.table({ email, password })

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
    console.table({ username, email, password, confirmPassword })


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

        if(!newTransaction) {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction`, {
        method: 'GET',
    })
    const data = await res.json()
    const session = await auth()

    if(res.status === 401 || !session) {
        return {
            success: false,
            error: 'Unauthorized',
            status: 401,
        }
    }

    if(res.status === 200) {
        return {
            success: true,
            data: data,
            status: 200,
        }
    }
  else {
        return {
            success: false,
            error: data.message,
            status: 500,
        }
    }
}

// gets recent transactions 
export async function getRecentTransactions() {
try {
        const session = await auth()
    if(!session) {
        return {
            success: false,
            message: 'Unauthorized',
            status: 401,
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

    return {
        success: true,
        data: data,
        status: 200,
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