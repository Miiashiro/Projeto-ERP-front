import { Box, Modal } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import api from '../../../api';
import mask from '../../../Components/Masks/mask';

const ModalDelete = ({ params }) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [prod, setProd] = useState("")
    const token = sessionStorage.getItem("Token")

    const toggle = () => setOpen(!open)

    const selectSale = (params) => {
        toggle()
        setId(params.row.id)
        setProd(params.row.produto)
    }

    async function deleteSale(){
        try{
            await api.delete(`/venda/${id}`, {headers: {'Authorization':`Bearer ${token}`}})

            alert("Venda deletada")

            window.location.reload()
        }catch(error){
            alert(`Erro ao deletar venda. Erro ${error}`)
        }
    }

    return (
        <>
            <GridActionsCellItem
                icon={<FaTrash />}
                label="Delete"
                onClick={() => selectSale(params)}
            />

            <Modal open={open}
                onClose={toggle}
            >
                <Box sx={mask.style}>
                    <h2>Deletar Produto</h2>
                    <hr />
                    <br />
                    <span>Deseja excluir o produto {prod}? </span>

                    <div className='group-buttons'>
                        <button className='close' onClick={toggle}>Fechar</button>

                        <button className='delete' onClick={deleteSale}>Deletar</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalDelete