import { Box, Modal, TextField } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

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

const ModalEdit = () => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [bill, setBill] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")

    const toggle = () => setOpen(!open)

    const handleShowEdit = () => {
        toggle()
    }
    return (
        <>
            <GridActionsCellItem
                icon={<FaEdit />}
                label="Edit"
                onClick={() => handleShowEdit()}
            />

            <Modal open={open}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Alterar Conta</h2>
                    <hr />
                    <br />
                    <div className='modal'>
                        <div className='wrap-input-field'>
                        <TextField className='id' label="Id" type="number"
                                value={id} onChange={(e) => setId(e.target.value)} />

                            <TextField className='conta' label="Conta" type="text"
                                value={bill} onChange={(e) => setBill(e.target.value)} />
                        </div>
                        <TextField className='preco' label="Valor" type="number"
                            value={price} onChange={(e) => setPrice(e.target.value)} />

                        <TextField className='data' type="date"
                            value={date} onChange={(e) => setDate(e.target.value)} />

                        <div className='group-buttons'>
                            <button className='close' onClick={toggle}>Fechar</button>

                            <button className='add'>Adicionar</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalEdit