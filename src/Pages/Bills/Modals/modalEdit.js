import { Box, Modal, TextField } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import api from '../../../api';
import mask from '../../../Components/Masks/mask';
import moment from "moment/moment";

const ModalEdit = ({params}) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [bill, setBill] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const token = sessionStorage.getItem("Token")

    const toggle = () => setOpen(!open)

    //Abre o modal e seta os valores nas const
    const handleShowEdit = (params) => {
        toggle()
        setId(params.row.id)
        setBill(params.row.conta)
        setPrice(params.row.preco)
        setDate(params.row.data)
    }

    //Editar Conta
    async function editBill(){
        try{
            const data = {
                id, bill, price, date
            }

            await api.put('/conta', data, {headers: {'Authorization':`Bearer ${token}`}})

            alert("Conta alterada")
            window.location.reload()
        }catch(error){
            alert(`Erro ao atualizar a conta ${error}`)
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
            >
                <Box sx={mask.style}>
                    <h2>Alterar Conta</h2>
                    <hr />
                    <br />
                    <div className='modal'>

                        {/*Id e conta */}
                        <div className='wrap-input-group'>
                            <TextField className='id' label="Id" disabled type="number"
                                value={id} onChange={(e) => setId(e.target.value)} />

                            <TextField className='conta' label="Conta" type="text"
                                value={bill} onChange={(e) => setBill(e.target.value)} />
                        </div>

                        <TextField className='preco' label="Valor"
                            value={price} onChange={(e) => setPrice(e.target.value)} 
                            InputProps={{
                                inputComponent: mask.priceCustom,
                              }}/>

                        <TextField className='data' label="Data"
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