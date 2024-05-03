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

const DeleteModal = ({ params }) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [name, setName] = useState("")

    const toggle = () => setOpen(!open)

    const selectProd = (params) => {
        toggle()
        setId(params.row.id)
        setName(params.row.produto)
    }

    async function deleteProd(){
        try{
            await api.delete(`/produto/${id}`)

            alert("Produto deletado")

            window.location.reload()
        }catch(error){
            alert(`Erro ao deletar produto. Erro ${error}`)
        }
    }
    return (
        <>
            <GridActionsCellItem
                icon={<FaTrash />}
                label="Delete"
                onClick={() => selectProd(params)}
            />

            <Modal open={open}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Deletar Produto</h2>
                    <hr />
                    <br />
                    <span>Deseja excluir o produto {name}? </span>

                    <div className='group-buttons'>
                        <button className='close' onClick={toggle}>Fechar</button>

                        <button className='delete' onClick={deleteProd}>Deletar</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default DeleteModal