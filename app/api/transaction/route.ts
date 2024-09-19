// create new transaction
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/Auth";

export async function POST(req: Request) {
    
    // get body
    const {
        amount,
        type,
        category,
        date,
        description
    } = await req.json();

   

    if (!amount || !type || !category || !date || !description) {
        return new Response("Missing required fields", { status: 400 });
    }

    console.log(amount, type, category, date, description)

    try {
        const session = await auth();
         if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

        const transaction = await prisma.transaction.create({
            data: {
                amount: parseInt(amount),
                type,
                category,
                description,
                userId: session.user?.id as string,
                transactiondate: new Date(date),
            }
        })
        return NextResponse.json({ message: `Transaction created! Amount: ${transaction.amount} added as ${transaction.type}` }, {
            status: 201,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, {
                status: 500,
            });
        } else {
            return NextResponse.json({ message: "An unknown error occurred" }, {
                status: 500,
            });
        }
    }
}


// get all transactions
export async function GET() {
    try {
        const session = await auth();
        
        if (!session || !session.user?.id) {
            console.log("Session or user ID missing");
            return NextResponse.json({ message: 'Session invalid or expired' }, { status: 401 });
        }

        console.log("User authenticated:", session.user.id);
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                transactiondate: "desc",
            },
        });

        if (!transactions.length) {
            console.log("No transactions found for user:", session.user.id);
            return NextResponse.json({ message: 'No transactions found' }, { status: 204 });
        }

        console.log("Transactions retrieved successfully");
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error("Error in GET transaction:", error);
        return NextResponse.json({ message: "An error occurred while fetching transactions" }, { status: 500 });
    }
}