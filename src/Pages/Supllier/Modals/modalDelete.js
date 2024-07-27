import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api'
import mask from '../../../Components/Masks/mask'
const Swal = require('sweetalert2')

const ModalDelete = ({params}) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const token = sessionStorage.getItem("Token")

  const toggle = () => setOpen(!open)

  //Abre o modal e seta os valores nas const
  const handleShowDelete = (params) => {
    toggle()
    setId(params.row.id)
    setName(params.row.fornecedor)
  }

  //Deletar fornecedor
  async function deleteSupllier(){
    try{
      await api.delete(`/fornecedor/${id}`, {headers: {'Authorization':`Bearer ${token}`}})

      Swal.fire({
        position: "absolute",
        icon: "success",
        title: "Fornecedor Deletado",
        showConfirmButton: false,
        timer: 2000,
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
        position: "absolute",
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
        label="delete"
        onClick={() => handleShowDelete(params)}
      />

      <Modal open={open}
          onClose={toggle}
          sx={{ zIndex: 1 }}
      >
        <Box sx={mask.style}>
          <h2>Deletar Fornecedor</h2>
          <hr />
          <br />
          <span>Deseja excluir o fornecedor {name}?</span>

          <div className='group-buttons'>
            <button className='close' onClick={toggle}>Fechar</button>

            <button className='delete' onClick={deleteSupllier}>Deletar</button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalDelete