import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({ budgetInfo }) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    const CalculateCardInfo = () => {

        console.log(budgetInfo);

        let totalBudget_ = 0;
        let totalSpend_ = 0;

        budgetInfo.forEach(element => {

            totalBudget_ = totalBudget_ + Number(element.amount)
            totalSpend_ = totalSpend_ + Number(element.totalSpend)
        });

        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)

        console.log(totalBudget_, totalSpend_)
    }

    useEffect(() => {

        budgetInfo && CalculateCardInfo()
    }, [budgetInfo])

    return (
        <div>
            {budgetInfo?.length>0?
                <div className='mt-7 flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

                    <div className='p-7 border rounded-lg flex justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>₹ {totalBudget}</h2>
                        </div>
                        <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>

                    <div className='p-7 border rounded-lg flex justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Spend</h2>
                            <h2 className='font-bold text-2xl'>₹ {totalSpend}</h2>
                        </div>
                        <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>

                    <div className='p-7 border rounded-lg flex justify-between'>
                        <div>
                            <h2 className='text-sm'>No. Of Budget</h2>
                            <h2 className='font-bold text-2xl'>{budgetInfo?.length}</h2>
                        </div>
                        <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>

                </div>
                :
                <div className='mt-7 flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {[1, 2, 3].map((item, index) => (
                        <div className='h-[120px] w-full bg-slate-200 animate-pulse rounded-lg'>

                        </div>
                    ))}
                </div>

            }
        </div>

    )
}

export default CardInfo
