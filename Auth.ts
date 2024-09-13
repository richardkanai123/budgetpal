import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import * as bcrypt from "bcrypt"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Your email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Your password"
                }
            },

            async authorize(credentials) {
                // get email and password from credentials
                const { email, password } = credentials as {
                    email: string
                    password: string
                }
                // get user from database
                const userData = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                // if user not found
                if (!userData) {
                    throw new Error("User not found")
                }
                // compare the passwords using bcrypt
                const passwordIsValid = await bcrypt.compare(password, userData.password)
                
                // if password is not valid
                if (!passwordIsValid) {
                    throw new Error("Invalid password")
                    // return null
                }
                // return user
                const user = {
                    id: userData.id,
                    name: userData.username,
                    email: userData.email,
                    password: userData.password
                }
                return user
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
})