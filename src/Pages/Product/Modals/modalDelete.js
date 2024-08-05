import { Box, Modal } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
import './modal.css'
const Swal = require('sweetalert2')

const DeleteModal = ({ params }) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const token = sessionStorage.getItem("Token")

    const toggle = () => setOpen(!open)

    //Abre o modal e seta os valores nas const
    const handleShowDelete = (params) => {
        toggle()
        setId(params.row.id)
        setName(params.row.produto)
    }

    //Deletar produto
    async function deleteProd(){
        try{
            await api.delete(`/produto/${id}`, {headers: {'Authorization':`Bearer ${token}`}})

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Produto Deletado",
                showConfirmButton: false,
                timer: 1800,
                // Classe para usar no css 
                customClass: {
                  popup: 'custom-swal'
                },
                // Ação ao fechar o alerta
                willClose: () => {
                  window.location.reload()
                }
              })
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Erro no sistema. Erro ${error}`,
                customClass: {
                  // Classe para usar no css 
                  popup: 'custom-swal'
                }
              })
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
                sx={{ zIndex: 1 }}
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