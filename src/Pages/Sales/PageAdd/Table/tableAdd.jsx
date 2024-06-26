import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import moment from "moment/moment";
import "./tableAddVenda.css"
import api from '../../../../api';

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
              id_sale: "",
              product_name: "",
              quantidade: "",    
              price: "",
              total: "",
              date_sale: ""
            }
          ]
          setData(falseData)   
        }
      } catch(error){
        console.log(`Eror ao encontrar dados ${error}`)
      }
    }
    getSale()
  }, [data])
  
  async function deleteSale(venda){
    try{
      const id = venda.id_sale
      
      await api.delete(`/lista/${id}`)
      
    }catch(error){
      alert(`Erro ao deletar a venda. Erro ${error}`)
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
                  {venda.product_name}
                </TableCell>
                <TableCell component="th">
                  {venda.quantidade}
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