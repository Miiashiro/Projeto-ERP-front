import { Box, Modal, TextField, Autocomplete } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import api from '../../../api'
import mask from '../../../Components/Masks/mask'
import "./modal.css"

const ModalEdit = ({ params }) => {

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [prod, setProd] = useState("")
    const [quant, setQuant] = useState("")
    const [price, setPrice] = useState("")
    const [vlrTotal, setVlrTotal] = useState("")
    const [date, setDate] = useState("")
    const toggle = () => setOpen(!open)

    //Busca de dados
    async function getData() {
        const { data } = await api.get('/produto')
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    //Abre o modal e seta os valores nas const
    const handleShowEdit = (params) => {
        toggle()
        setId(params.row.id)
        setProd(params.row.produto)
        setQuant(params.row.quant)
        setPrice(params.row.preco)
        setVlrTotal(params.row.total)
        setDate(params.row.data)
    }

    //Altera a venda
    async function alterSale() {
        try {
            const data = {
                id, prod, quant, date
            }

            await api.put('/venda', data)
            alert("Venda alterada")

            window.location.reload()
        } catch (error) {
            alert(`Erro ao atualizar. Erro ${error}`)
        }
    }

    //busca o nome dos produtos para o campo de autocompletar
    const autoComplete = data.map((row) => (
        {
            label: row.product_name
        }
    ))

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
                    <h2>Alterar Venda</h2>
                    <hr />
                    <br />
                    <div className='modal'>
                        <div className='wrap-input-group'>
                            <TextField label="Id" className='id' disabled
                                value={id} onChange={(e) => setId(e.target.value)} />

                            <Autocomplete disablePortal options={autoComplete}
                                renderInput={(params) => <TextField {...params} label="Produto" />}
                                className='prod'
                                value={prod} onChange={(e) => setProd(e.target.value)} />
                        </div>

                        <div className='wrap-input-group'>
                            <TextField label="Quantidade" className='field'
                                value={quant} onChange={(e) => setQuant(e.target.value)} />

                            <TextField label="Preço" className='field' disabled
                                value={price} onChange={(e) => setPrice(e.target.value)}
                                InputProps={{
                                    inputComponent: mask.priceCustom,
                                }} />
                        </div>

                        <div className='wrap-input-group'>
                            <TextField label="Valor Total" className='field' disabled
                                value={vlrTotal} onChange={(e) => setVlrTotal(e.target.value)}
                                InputProps={{
                                    inputComponent: mask.priceCustom,
                                }} />

                            <TextField label="Data" className='field'
                                value={date} onChange={(e) => setDate(e.target.value)} />
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