import { Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import './modal.css'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
const Swal = require('sweetalert2')

const ModalAdd = () => {

  const [open, setOpen] = useState(false)
  const [bill, setBill] = useState("")
  const [price, setPrice] = useState("")
  const [date, setDate] = useState("")
  const token = sessionStorage.getItem("Token")

  const toggle = () => setOpen(!open)

  //Adicionar conta
  async function addBill(){
    try{
      const data = {
        bill, price, date
      }

      await api.post('/conta', data, {headers: {'Authorization':`Bearer ${token}`}})

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Conta Adicionada",
        showConfirmButton: false,
        timer: 1400,
        // Classe para usar no css 
        customClass: {
          popup: 'custom-swal'
        },
        // Ação ao fechar o alerta
        willClose: () => {
          window.location.reload()
        }
      })
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Erro ao adicionar conta. Reveja os campos!`,
        customClass: {
          // Classe para usar no css 
          popup: 'custom-swal'
        }
      })
    }
  }

  return (
    <>
      <button className='buttonOpen' onClick={toggle}>ADICIONAR</button>

      <Modal
        open={open}
        onClose={toggle}
        sx={{ zIndex: 1 }}
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