import { Box, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import api from '../../../api';
import './modal.css'
import mask from '../../../Components/Masks/mask';

const ModalAdd = () => {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [quant, setQuant] = useState("")
  const [quantMin, setQuantMin] = useState("")
  const [quantMax, setQuantMax] = useState("")

  const toggle = () => setOpen(!open)

  async function addProd() {
    try {
      const data = {
        name, desc, price, quant, quantMin, quantMax
      }

      await api.post('/produto', data)
      alert("Produto cadastrado")

      window.location.reload()
    } catch (error) {
      alert(`Erro ao cadastrar produto`)
    }
  }

  return (
    <>
      <button className='buttonOpen' onClick={toggle}>ADICIONAR</button>

      <Modal
        open={open}
        onClose={toggle}
      >
        <Box sx={mask.style}>
          <h2>Adicionar Produto</h2>
          <hr />
          <br />
          <div className='modal'>

            <TextField className="produto" label="Produto"
              value={name} onChange={(e) => setName(e.target.value)} />

            <TextField className='desc' label="Descrição"
              value={desc} onChange={(e) => setDesc(e.target.value)} />

            
            <TextField className='preco' label="Preço"
              value={price} onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                inputComponent: mask.priceCustom,
              }} />

            <div className='wrap-input-group'>
              <TextField className="quant" label="Quantidade"
                value={quant} onChange={(e) => setQuant(e.target.value)} />

              <TextField className="quant" label="Quant Min"
                value={quantMin} onChange={(e) => setQuantMin(e.target.value)} />

              <TextField className="quant" label="Quant Max"
                value={quantMax} onChange={(e) => setQuantMax(e.target.value)} />
            </div>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='add' onClick={addProd}>Adicionar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalAdd