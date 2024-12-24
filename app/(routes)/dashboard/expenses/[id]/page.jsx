"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from './_components/AddExpense'
import ExpenseInfo from './_components/ExpenseList'
import ExpenseList from './_components/ExpenseList'
import { Button } from '@/components/ui/button'
import { ArrowLeft, PenBox, Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from './_components/EditBudget'


function Expense({ params }) {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState([]);
    const [expenseInfo, setExpenseInfo] = useState([]);

    const route = useRouter();

    const deleteBudget = async () => {


        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .returning();

        if (deleteExpenseResult) {

            const result = await db.delete(Budgets)
                .where(eq(Budgets.id, params.id))
                .returning();
            console.log(result)
        }

        toast('Budget Deleted')

        route.replace('/dashboard/budgets')


    }



    useEffect(() => {
        console.log(params)
        user && getBudgetInfo();
    }, [user])

    const getBudgetInfo = async() => {

        const result = await db.select({

            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id)
            ;

        setBudgetInfo(result[0]);
        getExpenseInfo();

        console.log(result)
        if(result)
        {
            
        }

    }

    const getExpenseInfo = async () => {

        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id))

        setExpenseInfo(result);

        console.log(result)


    }



    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center'>
                <span className='flex gap-2 items-center'>
                    <ArrowLeft onClick={() => route.back()} className='hover:cursor-pointer' />My Expenses
                </span>

                <div className='flex gap-2 items-center'>
                    {/* For Edit */}

                    <EditBudget budgetInfo = {budgetInfo} refreshData={() => getBudgetInfo()}/>

                    {/* For Delete */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild><Button className='flex gap-2 hover:animate-pulse' variant='destructive' ><Trash /> Delete </Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete your Budget.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>




            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>

                {budgetInfo ? <BudgetItem budget={budgetInfo} />
                    :

                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>


                    </div>
                }

                <AddExpense budgetId={params.id} refreshData={() => getBudgetInfo()} />



            </div>

            <div className='mt-5'>
                

                <ExpenseList expenseInfo={expenseInfo} refreshData={() => getExpenseInfo()} />
            </div>


        </div>
    )
}

export default Expense
