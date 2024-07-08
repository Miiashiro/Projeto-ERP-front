import React, { useState, useEffect } from 'react'
import api from '../../../api'
import { PieChart } from '@mui/x-charts'
import { Card, CardContent, Typography } from '@mui/material'
import { ResponsiveContainer } from 'recharts'

const PieCharts = () => {
  const [conta, setConta] = useState([])
  const token = sessionStorage.getItem("Token")

  async function getData() {
    const { data } = await api.get('/conta', {headers: {'Authorization':`Bearer ${token}`}})
    
    if(data.length > 0){
      setConta(data)
    }else{
      const falseData = [
        {
          id: 1,
          price: 1,
          name_bill: "Sem Dados"
        }
      ]
      setConta(falseData)
    }
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
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Contas a Pagar
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default PieCharts