"use client"
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseList({ expenseInfo, refreshData }) {

    const deleteExpense = async(expenses) => {


        const result = await db.delete(Expenses)
        .where(eq(Expenses.id,expenses.id))
        .returning();

        if(result)
        {
            toast('Expense Deleted!')
            refreshData()
        }
    }

    return (
        <div className='mt-3'>
            <h2 className='font-bold text-l'>
                    Latest Expenses
                </h2>

            <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>

                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>

            </div>

            {expenseInfo.map((expenses, index) => (

                <div className='grid grid-cols-4 bg-slate-50 p-2' key={index}>

                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2>
                        <Trash className='text-red-600 cursor-pointer hover:text-red-800 hover:animate-pulse' onClick={() => deleteExpense(expenses)}/>
                    </h2>

                </div>

            ))}
        </div>
    )
}

export default ExpenseList
