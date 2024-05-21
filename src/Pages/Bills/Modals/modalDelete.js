import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api';

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

const ModalDelete = ({ params }) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [bill, setBill] = useState("")

  const toggle = () => setOpen(!open)

  const handleShowDelete = (params) => {
    toggle()
    setId(params.row.id)
    setBill(params.row.conta)
  }

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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Deletar Conta</h2>
          <br />
          <hr />
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