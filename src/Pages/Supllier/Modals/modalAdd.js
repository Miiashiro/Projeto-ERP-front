import { Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import api from '../../../api';
import "./modal.css"
import mask from '../../../Components/Masks/mask';
import axios from 'axios';

const ModalAdd = () => {

  const [open, setOpen] = useState(false)
  const [supllier, setSupllier] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTel] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [cep, setCep] = useState("")
  const [address, setAddress] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const toggle = () => setOpen(!open)

  //Adicionar fornecedor
  async function addSupllier() {
    try {
      const data = {
        supllier, email, tel, cnpj, cep, address, neighborhood, city, state
      }

      await api.post('/fornecedor', data)

      alert("Fornecedor cadastrado")
      window.location.reload()

    } catch (error) {
      alert(`Erro ao adicionar fornecedor. Erro ${error}`)
    }
  }

  //Api de cep
  async function ckeckCep(){
    try{
      const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      setAddress(data.logradouro)
      setNeighborhood(data.bairro)
      setCity(data.localidade)
      setState(data.uf)

    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <button className='buttonOpen' onClick={toggle}>ADICIONAR</button>

      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mask.style}>
          <h2>Adicionar Fornecedor</h2>
          <hr />
          <br />
          <div className="modal">
            <TextField className='forne' label="Fornecedor" type="text"
              value={supllier} onChange={(e) => setSupllier(e.target.value)} />

            <div className='wrap-input-group'>
              <TextField className='email' label="Email" type="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <TextField className='tel' label="Telefone" type="tel"
                value={tel} onChange={(e) => setTel(e.target.value)} 
                InputProps={{
                  inputComponent: mask.TextMaskTel,
                }}/>
            </div>

            <div className='wrap-input-group'>
              <TextField className='cnpj' label="CNPJ" type="text"
                value={cnpj} onChange={(e) => setCnpj(e.target.value)} 
                InputProps={{
                  inputComponent: mask.TextMaskCnpj,
                }}/>

              <TextField className="cep" label="CEP" type="text"
                value={cep} onChange={(e) => setCep(e.target.value)}
                onBlur={ckeckCep} 
                InputProps={{
                  inputComponent: mask.TextMaskCep,
                }}/>
            </div>

            <TextField className='endereco' label="Endereço" type="text"
              value={address} onChange={(e) => setAddress(e.target.value)} />

            <TextField className='bairro' label="Bairro" type="text"
              value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />

            <div className='wrap-input-group'>
              <TextField className='cidade' label="Cidade" type="text"
                value={city} onChange={(e) => setCity(e.target.value)} />

              <TextField className="pais" label="País" type="text"
                value={state} onChange={(e) => setState(e.target.value)} />
            </div>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='add' onClick={addSupllier}>Adicionar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalAdd