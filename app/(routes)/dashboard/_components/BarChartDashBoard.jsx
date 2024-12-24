"use client"
import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashBoard({ budgetInfo }) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>

      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart data={budgetInfo} margin={{ top: 7, left: 15 }}>
          <XAxis dataKey={'name'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='amount' stackId={"b"} fill='#4845d2' />
          <Bar dataKey='totalSpend' stackId={"a"} fill='#C3C2FF' />

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashBoard
