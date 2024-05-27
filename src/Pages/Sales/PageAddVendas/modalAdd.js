import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useState } from 'react'
import LayoutComponent from '../../../Components/LayoutComponentUsual/layoutComponent'
import "./addVenda.css"

const AddVenda = () => {

  const [name, setName] = useState("")
  const [quant, setQuant] = useState("")

  return (
    <LayoutComponent title="Vendas em Aberto">
      <div className='container-venda'>
        <div className='container-items'>
          <div className='wrap-table-venda'>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Preço</TableCell>
                    <TableCell>Valor Total</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
          <div className='nsei'>
            <div className='inputs'>
              <div className='wrap-input-venda'>
              <TextField type="text" label="Nome" variant="standard" className='standart'/>
              </div>

              <div className='wrap-input-venda'>
                <TextField type="number" label="Quantidade" variant="standard" className='standart'/>
              </div>

              <div className='wrap-input-venda'>
                <TextField type="date" variant="standard" className='data'/>
              </div>

              <button className='adicionar'>Adicionar</button>
            </div>

            <button className='salvar'>Salvar</button>
          </div>
        </div>
        <div className='contador'>
          o
        </div>
      </div>
    </LayoutComponent>
  )
}

export default AddVenda