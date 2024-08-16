import { Box, Modal, TextField } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import './modal.css'
import { FaEdit } from 'react-icons/fa'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
import moment from "moment/moment";
const Swal = require('sweetalert2')

const ModalEdit = ({params}) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [bill, setBill] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const token = sessionStorage.getItem("Token")

    const toggle = () => setOpen(!open)

    //Abre o modal e seta os valores nas const
    async function handleShowEdit(params){
        toggle()
        setId(params.row.id)
        setBill(params.row.conta)
        setPrice(params.row.preco)
        setDate(moment(params.row.data, "DD/MM/YYYY").format("YYYY-MM-DD"))
        
    }

    //Editar Conta
    async function editBill(){
        try{
            const data = {
                id, 
                bill, 
                price, 
                date
            }

            await api.put('/conta', data, {headers: {'Authorization':`Bearer ${token}`}})

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Conta Alterada",
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
                title: `Erro ao alterar conta. Reveja os campos!`,
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
                icon={<FaEdit />}
                label="Edit"
                onClick={() => handleShowEdit(params)}
            />

            <Modal open={open}
                onClose={toggle}
                sx={{ zIndex: 1 }}
            >
                <Box sx={mask.style}>
                    <h2>Alterar Conta</h2>
                    <hr />
                    <br />
                    <div className='modal'>

                        {/*Id e conta */}
                        <div className='wrap-input-group'>
                            <TextField className='id' label="Id" disabled
                                value={id} onChange={(e) => setId(e.target.value)} />

                            <TextField className='conta' label="Conta" type="text"
                                value={bill} onChange={(e) => setBill(e.target.value)} />
                        </div>

                        <TextField className='preco' label="Valor" type="text"
                            value={price} onChange={(e) => setPrice(e.target.value)} 
                            InputProps={{
                                inputComponent: mask.priceCustom,
                              }}/>

                        <TextField className='data' label="Data" type="date"
                            value={date} onChange={(e) => setDate(e.target.value)} />

                        <div className='group-buttons'>
                            <button className='close' onClick={toggle}>Fechar</button>

                            <button className='add' onClick={editBill}>Alterar</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalEdit