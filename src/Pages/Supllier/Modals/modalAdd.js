import { Box, Modal } from '@mui/material';
import React, { useState } from 'react'

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

const ModalAdd = () => {

    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(!open)
    return (
      <div>
        <button className='adicionar' onClick={toggle}>ADICIONAR</button>

        <Modal
          open={open}
          onClose={toggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Adicionar Fornecedor</h2>
            <hr />
            <br />
            
          </Box>
        </Modal>

      </div>
    )
}

export default ModalAdd