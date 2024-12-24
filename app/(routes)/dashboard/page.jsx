"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashBoard from './_components/BarChartDashBoard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseList from './expenses/[id]/_components/ExpenseList';

function dashboard() {

  const [budgetList, setBudgetList] = useState([]);
  const[expensesList, setExpensesList] = useState([]);

  const { user } = useUser();

  useEffect(() => {

    user && getBudgetList();


  }, [user])

  const getBudgetList = async () => {

    const result = await db.select({

      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  }

  const getAllExpenses = async() => {

    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt

    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));

    setExpensesList(result)

  }

  return (

    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
      <p className='text-gray-500'>Here's what happening with your money, Lets Manage Your Expense!</p>

      <CardInfo budgetInfo={budgetList} />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>

        <div className='md:col-span-2'>
          <BarChartDashBoard budgetInfo = {budgetList}/>
          <ExpenseList expenseInfo={expensesList} refreshData={() => getBudgetList()} />
        </div>

        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
            {budgetList.map((budget,index) => (
              <BudgetItem budget = {budget} key={index} />
            ))}
        </div>

      </div>
    </div>


  )
}

export default dashboard
