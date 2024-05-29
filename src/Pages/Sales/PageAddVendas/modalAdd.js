import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useState } from 'react'
import LayoutComponent from '../../../Components/LayoutComponentUsual/layoutComponent'
import "./addVenda.css"
import api from "../../../api"

const AddVenda = () => {

  const [id_prod, setIdProd] = useState("")
  const [quant, setQuant] = useState("")
  const [dateSale, setDateSale] = useState("")

  async function addSale() {
    try {
      const data = {
        id_prod, quant, dateSale
      }

      await api.post('/venda', data)
      alert("Venda cadastrada")
    }catch(error){
      alert(`Erro ao cadastrar venda. Erro ${error}`)
    }
  }

  return (
    <LayoutComponent title="Vendas em Aberto">
      <div className='container-venda'>
        <div className='container-items'>
          <div className='wrap-table-venda'>
            <TableContainer>
              <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
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
                <TextField type="text" label="Nome" variant="standard" className='standart'
                  value={id_prod} onChange={(e) => setIdProd(e.target.value)} />
              </div>

              <div className='wrap-input-venda'>
                <TextField type="number" label="Quantidade" variant="standard" className='standart'
                  value={quant} onChange={(e) => setQuant(e.target.value)} />
              </div>

              <div className='wrap-input-venda'>
                <TextField type="date" variant="standard" className='data'
                  value={dateSale} onChange={(e) => setDateSale(e.target.value)} />
              </div>

              <button className='adicionar' onClick={addSale}>Adicionar</button>
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