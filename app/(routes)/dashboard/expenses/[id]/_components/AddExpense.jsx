"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Loader, Trash } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId,refreshData}) {

    const [name,setName] = useState();
    const [amount,setAmount] = useState();
    const [loading,setLoading] = useState(false);
    const {user} = useUser();

    const addNewExpense = async() => {

        setLoading(true)

        const result = await db.insert(Expenses)
            .values({
                name: name,
                amount: amount,
                createdAt: moment().format('DD/MM/YYYY'),
                budgetId:budgetId
                
            }).returning({ insertedId: Budgets.id })

            setAmount('')
            setName('')

            if(result)
            {
                setLoading(false)
                refreshData();
                toast('New Expense Added!');
            }

    }

    return (
        <div className='border p-5 rounded-lg'>

            <h2 className='font-bold text-lg text-center'> Add Expense 
                
            </h2>

                <div className='mt-2'>

                    <h2 className='text-black font-bold my-1'>
                        Expense Name
                    </h2>
                    <Input placeholder='e.g. Furniture Tools' value = {name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='mt-2'>

                    <h2 className='text-black font-bold my-1'>
                        Expense Amount (in Rs.)
                    </h2>
                    <Input type="number" placeholder='e.g. 500' value = {amount} onChange={(e) => setAmount(e.target.value)} />
                </div>

            <Button disabled = {!(name&&amount)} className = 'mt-3 w-full'
            onClick={() => addNewExpense()}>
                {loading?
                <Loader className='animate-spin'/>:"Add New Expense"}
                
                
            </Button>

            
        </div>
    )
}

export default AddExpense
