import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api'
import mask from './mask.js'

const ModalDelete = ({params}) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")

  const toggle = () => setOpen(!open)

  //Selecionar fornecedor
  const selectSupllier = (params) => {
    toggle()
    setId(params.row.id)
    setName(params.row.fornecedor)
  }

  //Deletar fornecedor
  async function deleteSupllier(){
    try{
      await api.delete(`/fornecedor/${id}`)

      alert("Fornecedor deletado!")

      window.location.reload()
    }catch(error){
      alert(`Erro ao deletar fornecedor. Erro ${error}`)
    }
  }
  
  return (
    <>
      <GridActionsCellItem
        icon={<FaTrash />}
        label="delete"
        onClick={() => selectSupllier(params)}
      />

      <Modal open={open}
          onClose={toggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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