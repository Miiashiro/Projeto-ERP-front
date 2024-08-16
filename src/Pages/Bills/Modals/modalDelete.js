import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import './modal.css'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
const Swal = require('sweetalert2')

const ModalDelete = ({ params }) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [bill, setBill] = useState("")
  const token = sessionStorage.getItem("Token")

  const toggle = () => setOpen(!open)

  //Abre o modal e seta os valores nas const
  const handleShowDelete = (params) => {
    toggle()
    setId(params.row.id)
    setBill(params.row.conta)
  }

  //Deletar conta
  async function deleteBill(){
    try{
      await api.delete(`/conta/${id}`, {headers: {'Authorization':`Bearer ${token}`}})

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Conta Deletada",
        showConfirmButton: false,
        timer: 1800,
        // Classe para usar no css 
        customClass: {
          popup: 'custom-swal'
        },
        // Ação ao fechar o alerta
        willClose: () => {
          window.location.reload()
        }
      })
    } catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Erro no sistema. Erro: ${error}`,
        customClass: {
          // Classe para usar no css 
          popup: 'custom-swal'
        }
      })
    }
  }
  
  return (
    <>
      <GridActionsCellItem
        icon={<FaTrash />}
        label="Delete"
        onClick={() => handleShowDelete(params)}
      />

      <Modal open={open}
        onClose={toggle}
        sx={{ zIndex: 1 }}
      >
        <Box sx={mask.style}>
          <h2>Deletar Conta</h2>
          <hr />
          <br />
          <div className="Modal">
            <span>Deseja excluir a conta {bill}?</span>
            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='delete' onClick={deleteBill}>Deletar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalDelete