import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import api from '../../../api';

const LineCharts = () => {
  const [venda, setVenda] = useState([])

  async function getData() {
    const { data } = await api.get('/lineChart')
    if(data){
      setVenda(data)
    }else {
      const falseData = [
        {
          id: 1,
          price: 1,
          name_bill: "Sem Dados"
        }
      ]
      setVenda(falseData)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const data = venda.map((row) => (
    {
      meses: row.label,
      valor: row.total
    }
  ))
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Valor Meses
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="meses" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valor" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default LineCharts