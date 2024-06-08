import React, { useState, useEffect } from 'react'
import api from '../../../api'
import { PieChart } from '@mui/x-charts'

const PieCharts = () => {
    const [conta, setConta] = useState([])

    async function getData(){
        const { data } = await api.get('/conta')
        setConta(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const data = conta.map((row) => (
        {
          id: row.id_bill,
          value: row.price,
          label: row.name_bill,
        }
      ))

    return (
      <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={250}
      width={650}
    />
    )
}

export default PieCharts