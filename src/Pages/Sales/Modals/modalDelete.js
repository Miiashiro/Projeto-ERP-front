import { Box, Modal } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
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
    const [prod, setProd] = useState("")

    const toggle = () => setOpen(!open)

    const selectSale = (params) => {
        toggle()
        setId(params.row.id)
        setProd(params.row.produto)
    }

    async function deleteSale(){
        try{
            await api.delete(`/venda/${id}`)

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
                <Box sx={style}>
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