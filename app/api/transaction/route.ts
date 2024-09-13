// create new transaction

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const {
        amount,
        type,
        category,
        date,
        description,
        userid
    } = body;
    if (!amount || !type || !category || !date || !description || !userid) {
        return new Response("Missing required fields", { status: 400 });
    }

    const transaction = await prisma.transaction.create({
        data: {
            amount,
            type,
            category,
            description,
            userId: userid,
            user: {
                connect: {
                    id: userid
                }
            }
        }
    })

    return NextResponse.json({ message: "Transaction created", transaction }, {
        status: 201,
    });
}