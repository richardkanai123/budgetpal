// fetch a user given a user id in the url

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        // find a user
        const user = await prisma.user.findUnique({
            where: {
                id: params.id,
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // remove the password from the user object
        const userWithoutPassword = {
            ...user,
            password: undefined,
        }

        return NextResponse.json({ user: userWithoutPassword }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}



// register new user
export async function POST(request: Request) {
    try {
        const { username, email, password, avatar } = await request.json()
        // check if email is valid
        if (!email || !email.includes('@')) {
            return NextResponse.json({ message: 'Email is invalid' }, { status: 400 })
        }
        // check if password is valid
        if (!password || password.length < 6) {
            return NextResponse.json({ message: 'Password is invalid' }, { status: 400 })
        }
        // check if username is valid
        if (!username || username.length < 5) {
            return NextResponse.json({ message: 'Username is invalid' }, { status: 400 })
        }

        // encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        // check if user already exists in the database
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (userExists) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 })
        } else {


            // create a new user
            await prisma.user.create({
                data: {
                    name: username,
                    email,
                    image: avatar,
                    password: hashedPassword,

                }
            })
            return NextResponse.json({
                message: 'User created successfully',
            },{ status: 201 })
        }

    }
    catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        return NextResponse.json({ error: `Something went wrong: ${errorMessage}` }, { status: 500 })
    }
}