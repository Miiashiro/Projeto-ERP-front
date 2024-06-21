import { Modal, Box, TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react'
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import api from "../../../api"
import "./modal.css"
import mask from '../../../Components/Masks/mask';

const EditModal = ({ params }) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [quant, setQuant] = useState("")
  const [quantMin, setQuantMin] = useState("")
  const [quantMax, setQuantMax] = useState("")

  const toggle = () => setOpen(!open)

  const handleShowEdit = (params) => {
    toggle()
    setId(params.row.id)
    setName(params.row.produto)
    setDesc(params.row.desc)
    setPrice(params.row.preco)
    setQuant(params.row.quant)
    setQuantMin(params.row.quantMin)
    setQuantMax(params.row.quantMax)
  }

  async function alterProd() {
    try {
      const data = {
        id, name, desc, price, quant, quantMin, quantMax
      }

      await api.put('/produto', data)

      alert("Produto alterado")
      window.location.reload()
    } catch (error) {
      alert(`Erro ao alterar o produto ${error}`)
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
          <h2>Alterar Produto</h2>
          <hr />
          <br />
          <div className='modal'>
            
            {/*Id e Nome*/}
            <div className='wrap-input-group'>
              <TextField className="ids" label="Id" disabled
                value={id} onChange={(e) => setId(e.target.value)}
              />

              <TextField className="produtos" label="Produto"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/*Descrição*/}
            <TextField className='desc' label="Descrição"
              value={desc} onChange={(e) => setDesc(e.target.value)}
            />

            {/*Preço*/}
            <TextField className='preco' label="Preço"
              value={price} onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                inputComponent: mask.priceCustom,
              }}
            />

            {/*Quantidades*/}
            <div className='wrap-input-group'>
              <TextField className="quant" label="Quantidade"
                value={quant} onChange={(e) => setQuant(e.target.value)}
              />

              <TextField className="quant" label="Quant Min"
                value={quantMin} onChange={(e) => setQuantMin(e.target.value)}
              />

              <TextField className="quant" label="Quant Max"
                value={quantMax} onChange={(e) => setQuantMax(e.target.value)}
              />
            </div>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='alter' onClick={alterProd}>Alterar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default EditModal