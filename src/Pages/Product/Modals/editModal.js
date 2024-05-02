import { Modal, Box, TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react'
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";

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

const EditModal = ({ params }) => {

  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  const selectProd = (params) => {
    toggle()
    
  }

  return (
    <>
      <GridActionsCellItem
        icon={<FaEdit />}
        label="Edit"
        onClick={() => selectProd(params)}
      />

      <Modal open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Alterar Produto</h2>
          <hr />
          <br />
          <div className='modal'>
            <div className='wrap-input-prod'>
              <TextField className="id" label="Id" />

              <TextField className="produto" label="Produto" />
            </div>

            <div className='wrap-input-field'>
              <TextField className='desc' label="Descrição" />
            </div>

            <div className='wrap-input-field'>
              <TextField className='preco' label="Preço" />
            </div>

            <div className='wrap-input-quant'>
              <TextField className="quant" label="Quantidade"
                 />

              <TextField className="quant" label="Quant Min"
                 />

              <TextField className="quant" label="Quant Max"
              />
            </div>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='add'>Alterar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default EditModal