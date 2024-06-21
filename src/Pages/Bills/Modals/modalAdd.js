import { Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import './modals.css'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';

const ModalAdd = () => {

  const [open, setOpen] = useState(false)
  const [bill, setBill] = useState("")
  const [price, setPrice] = useState("")
  const [date, setDate] = useState("")

  const toggle = () => setOpen(!open)

  //Adicionar conta
  async function addBill(){
    try{
      const data = {
        bill, price, date
      }

      await api.post('/conta', data)
      alert("Conta cadastrada")

      window.location.reload()
    }catch(error){
      alert(`Erro ao cadastrar. Erro ${error}`)
    }
  }

  return (
    <>
      <button className='buttonOpen' onClick={toggle}>ADICIONAR</button>

      <Modal
        open={open}
        onClose={toggle}
      >
        <Box sx={mask.style}>
          <h2>Adicionar Conta</h2>
          <hr />
          <br />
          <div className='modal'>

            <TextField className='conta' label="Conta" type="text"
              value={bill} onChange={(e) => setBill(e.target.value)}/>

            <TextField className='preco' label="Valor" 
              value={price} onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                inputComponent: mask.priceCustom,
              }}/>

            <TextField className='data' type="date" 
              value={date} onChange={(e) => setDate(e.target.value)}/>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='add' onClick={addBill}>Adicionar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalAdd