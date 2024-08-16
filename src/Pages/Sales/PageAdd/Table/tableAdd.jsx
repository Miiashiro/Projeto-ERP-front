import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import moment from "moment/moment";
import "./tableAddVenda.css"
import api from '../../../../api';
const Swal = require('sweetalert2')

export default function TableAddVenda() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function getSale() {
      try{
        const { data } = await api.get('/lista')
        
        if(data.length > 0){
          setData(data)
        } else{
          const falseData = [
            {
              id_sale: 1,
              product: "Adicione",
              quant: "uma",    
              price: "venda",
              total: null
            }
          ]
          setData(falseData)   
        }
      } catch(error){
        console.log(`Erro ao encontrar dados ${error}`)
      }
    }
    getSale()
  }, [data])
  
  // Deletar itens
  async function deleteSale(venda){
    try{
      const id = venda.id_sale
      
      await api.delete(`/lista/${id}`)
      
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Erro no sistema. Erro ${error}`
      })
    }
  }

  return (
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
              <TableCell>Data</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((venda, index) => (
              <TableRow
                key={index}
              >
                <TableCell component="th">
                  {venda.id_sale}
                </TableCell>
                <TableCell component="th">
                  {venda.product}
                </TableCell>
                <TableCell component="th">
                  {venda.quant}
                </TableCell>
                <TableCell component="th">
                  {venda.price}
                </TableCell>
                <TableCell component="th">
                  {venda.total}
                </TableCell>
                <TableCell component="th">
                  {moment(venda.date_sale).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  <FaTrash onClick={() => deleteSale(venda)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}