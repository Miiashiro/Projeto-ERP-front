import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';

const ModalDelete = ({ params }) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [bill, setBill] = useState("")

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
      await api.delete(`/conta/${id}`)

      alert("Conta deletada")

      window.location.reload()
    } catch(error){
      alert(`Erro ao deletar produto. Erro ${error}`)
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