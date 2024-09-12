// fetch a user given a user id in the url

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
export  async function GET(request: Request, { params }: { params: { id: string } }) {
   try {
       // find a user
       const user = await prisma.user.findUnique({
           where: {
               id: parseInt(params.id),
           }
       })

       if(!user) {
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
        const { name, email, password } = await request.json()
        // encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        // create a new user
      await prisma.user.create({
            data: {
                username: name,
                email,
                password: hashedPassword,

            }
        })
        return NextResponse.json( { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}