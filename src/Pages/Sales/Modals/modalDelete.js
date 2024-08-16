import { Box, Modal } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
const Swal = require('sweetalert2')

const ModalDelete = ({ params }) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [prod, setProd] = useState("")
    const token = sessionStorage.getItem("Token")

    const toggle = () => setOpen(!open)

    //Abre o modal e seta os valores nas variaveis
    const selectSale = (params) => {
        toggle()
        setId(params.row.id)
        setProd(params.row.produto)
    }

    //Deleta a venda
    async function deleteSale(){
        try{
            await api.delete(`/venda/${id}`, {headers: {'Authorization':`Bearer ${token}`}})

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Venda Deletada",
                showConfirmButton: false,
                timer: 1400,
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
                title: `Erro no sistema. Erro: ${error}`,
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
                onClick={() => selectSale(params)}
            />

            <Modal open={open}
                onClose={toggle}
                sx={{ zIndex: 1 }}
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