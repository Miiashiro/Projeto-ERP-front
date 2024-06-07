import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({params}) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")

  const toggle = () => setOpen(!open)

  const selectSupllier = (params) => {
    toggle()
    setId(params.row.id)
    setName(params.row.fornecedor)
  }

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
        <Box sx={style}>
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