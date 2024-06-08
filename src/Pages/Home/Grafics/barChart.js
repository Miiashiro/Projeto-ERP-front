import React from 'react'
import api from '../../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const BarCharts = () => {

  const [data, setData] = useState([])

  async function getData() {
    const { data } = await api.get('/barChart')
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const uData = data.map((row) => (
    {
      prod: row.id_prod_fk,
      total: row.total
    }
  ))

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Produtos Comprados
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={uData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="prod" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default BarCharts