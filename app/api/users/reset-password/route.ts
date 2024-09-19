import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server";

// reset user password
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password, confirmPassword } = body
        if (!email || !password || !confirmPassword) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
        }
        if (password !== confirmPassword) {
            return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 })

        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })


        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: hashedPassword,
            }

        })

        if (updatedUser) {
            return NextResponse.json({ message: 'User updated!' }, { status: 200 })

        }
        else {
            return NextResponse.json({ message: 'Failed to update' }, { status: 500 })

        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })

        }
        return NextResponse.json({ message: 'Unexpcted error occurred!' }, { status: 500 })

    }
}

