'use server'

import { signIn as naSignIn, signOut as naSignOut } from "@/Auth"
import { AuthError } from "next-auth"

export async function signIn() {
    await naSignIn()
}

export async function signOut() {
    await naSignOut()
}

// sign in with credentials
export async function signInWithCredentials(values: FormData) {
    const email = values.get('email') as string
    const password = values.get('password') as string

    console.table({email,password})

    try {
        await naSignIn('credentials', {
            email,
            password,   
        redirect: false,
        })
        return {
            success : true
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
                
                case 'CallbackRouteError': {
                    return {
                       success: false,
                    error: 'Wrong password!'
                   } 
                }
                default:
                    return {
                        success: false,
                        error: 'Something went wrong'
                    }
            }        }
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

        if(password !== confirmPassword) {
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
        console.log(Response)

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