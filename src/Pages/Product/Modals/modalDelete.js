import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
import './modal.css'

const DeleteModal = ({ params }) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [name, setName] = useState("")

    const toggle = () => setOpen(!open)

    //Abre o modal e seta os valores nas const
    const selectProd = (params) => {
        toggle()
        setId(params.row.id)
        setName(params.row.produto)
    }

    //Deletar produto
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
            >
                <Box sx={mask.style}>
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