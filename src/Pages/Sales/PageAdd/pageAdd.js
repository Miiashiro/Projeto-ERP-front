import React from 'react'
import LayoutComponent from '../../../Components/LayoutComponentUsual/layoutComponent'
import "./addVenda.css"
import TableAddVenda from './Table/tableAdd'
import Form from './Forms/form'
import Contador from './Contador/contador'

const AddVenda = () => {
  return (
    <LayoutComponent title="Vendas em Aberto">
      <div className='container-venda'>
        <div className='container-items'>
          <TableAddVenda />

          <Form /> 
        </div>
        
        <Contador />
      </div>
    </LayoutComponent>
  )
}

export default AddVenda