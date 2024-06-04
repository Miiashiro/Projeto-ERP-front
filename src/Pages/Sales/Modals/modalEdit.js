import { Box, Modal, TextField } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import api from '../../../api'
import "./modal.css"

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

const ModalEdit = ({params}) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [prod, setProd] = useState("")
    const [quant, setQuant] = useState("")
    const [price, setPrice] = useState("")
    const [vlrTotal, setVlrTotal] = useState("")
    const [date, setDate] = useState("")

    const toggle = () => setOpen(!open)

    const handleShowEdit = (params) => {
        toggle()
        setId(params.row.id)
        setProd(params.row.produto)
        setQuant(params.row.quant)
        setPrice(params.row.preco)
        setVlrTotal(params.row.total)
        setDate(params.row.data)
    }

    async function alterSale(){
        try{
            const data = {
                id, prod, quant, date
            }

            await api.put('/venda', data)
            alert("Venda alterada")

            window.location.reload()
        }catch(error){
            alert(`Erro ao atualizar. Erro ${error}`)
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
                <Box sx={style}>
                    <h2>Alterar Venda</h2>
                    <hr />
                    <br />
                    <div className='modal'>
                        <div className='wrap-input-group'>
                            <TextField label="Id" className='id' disabled 
                             value={id} onChange={(e) => setId(e.target.value)}/>

                            <TextField label="Produto" className='prod'
                             value={prod} onChange={(e) => setProd(e.target.value)}/>
                        </div>

                        <div className='wrap-input-group'>
                            <TextField label="Quantidade" className='field'
                             value={quant} onChange={(e) => setQuant(e.target.value)}/>

                            <TextField label="Preço" className='field' disabled
                             value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>

                        <div className='wrap-input-group'>
                            <TextField label="Valor Total" className='field' disabled
                             value={vlrTotal} onChange={(e) => setVlrTotal(e.target.value)}/>

                            <TextField label="Data" className='field'
                             value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div>

                        <div className='group-buttons'>
                            <button className='close' onClick={toggle}>Fechar</button>

                            <button className='alter' onClick={alterSale}>Alterar</button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalEdit