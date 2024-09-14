import NextAuth, { AuthError, NextAuthConfig} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import * as bcrypt from "bcrypt"
   

// auth options
const authOptions: NextAuthConfig = {
   adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session:{strategy:"jwt"},
        providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {

                console.table(credentials)

                try {
                    // check if credentials are provided
                    if (!credentials?.email || !credentials?.password) {
                        throw new AuthError('Please enter an email and password')
                    }
                    // get user from database
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email as string,
                        }
                    })

                    //    check if user exists
                    if (!user) {
                        throw new AuthError('User does not exist')
                    } else {
                        const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password)
                        if (!isPasswordValid) {
                            throw new Error('Incorrect Password')
                        }

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { password, ...userWithoutPassword } = user
                        return userWithoutPassword
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message)
                    } else {
                        throw new Error('An unknown error occurred')
                    }
                }
            }
        })
    ],

   
    pages: {
        signIn: '/sign-in',
        newUser: '/sign-up'
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)