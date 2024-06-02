import React from 'react'
import LayoutComponent from '../../../Components/LayoutComponentUsual/layoutComponent'
import "./addVenda.css"
import TableAddVenda from './Table/tableAdd'
import Form from './Forms/form'

const AddVenda = () => {



  return (
    <LayoutComponent title="Vendas em Aberto">
      <div className='container-venda'>
        <div className='container-items'>
          <TableAddVenda />

          <Form /> 
        </div>
        <div className='contador'>
          o
        </div>
      </div>
    </LayoutComponent>
  )
}

export default AddVenda