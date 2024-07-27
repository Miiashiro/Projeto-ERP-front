import { Box, Modal, TextField, Autocomplete } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import api from '../../../api'
import mask from '../../../Components/Masks/mask'
import moment from 'moment'
import "./modal.css"
const Swal = require('sweetalert2')

const ModalEdit = ({ params }) => {

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [value, setValue] = useState("");
    const [prod, setProd] = useState("")
    const [quant, setQuant] = useState("")
    const [price, setPrice] = useState("")
    const [vlrTotal, setVlrTotal] = useState("")
    const [date, setDate] = useState("")
    const token = sessionStorage.getItem("Token")

    const toggle = () => setOpen(!open)

    //Busca de dados
    async function getData() {
        const { data } = await api.get('/produto', { headers: { 'Authorization': `Bearer ${token}` } })
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    //Abre o modal e seta os valores nas variaveis
    const handleShowEdit = (params) => {
        toggle()
        setId(params.row.id)
        setValue(params.row.produto.toString())
        setQuant(params.row.quant)
        setPrice(params.row.preco)
        setVlrTotal(params.row.total)
        setDate(moment(params.row.data, "DD-MM-YYYY").format("YYYY-MM-DD"))
    }

    //Altera a venda
    async function alterSale() {
        try {
            const data = {
                id, prod, quant, date
            }

            await api.put('/venda', data, {headers: {'Authorization':`Bearer ${token}`}})

            Swal.fire({
                position: "absolute",
                icon: "success",
                title: "Venda Alterada",
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
        } catch (error) {
            Swal.fire({
                position: "absolute",
                icon: "error",
                title: `Erro ao alterar venda. Reveja os campos!`,
                customClass: {
                  // Classe para usar no css 
                  popup: 'custom-swal'
                }
              })
        }
    }

    //busca o nome dos produtos para o campo de autocompletar
    const autoComplete = data.map((row) => (
        {
            id: row,
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
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={prod}
                                onInputChange={(event, newInputValue) => {
                                    setProd(newInputValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id} />
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

                            <TextField label="Data" className='field' type="date"
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