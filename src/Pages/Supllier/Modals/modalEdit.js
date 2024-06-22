import { Box, Modal, TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import api from '../../../api';
import "./modal.css"
import mask from '../../../Components/Masks/mask';
import axios from 'axios';

const ModalEdit = ({ params }) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [supllier, setSupllier] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTel] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [cep, setCep] = useState("")
  const [address, setAddress] = useState("")
  const [neighborhood, setNbhd] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const token = sessionStorage.getItem("Token")

  const toggle = () => setOpen(!open)
  
  //Abre o modal e seta os valores nas const
  const handleShowEdit = (params) => {
    toggle()
    setId(params.row.id)
    setSupllier(params.row.fornecedor)
    setEmail(params.row.email)
    setTel(params.row.telefone)
    setCnpj(params.row.cnpj)
    setCep(params.row.cep)
    setAddress(params.row.endereco)
    setNbhd(params.row.bairro)
    setCity(params.row.cidade)
    setState(params.row.pais)
  }

  //Editar fornecedor
  async function editSupllier(){
    try{
      const data = {
        id, supllier, email, tel, cnpj, cep, address, neighborhood, city, state
      }

      await api.put('/fornecedor', data, {headers: {'Authorization':`Bearer ${token}`}})

      alert("Fornecedor alterado!")

      window.location.reload()

    }catch(error){
      alert(`Erro ao atualiar. Erro ${error}.`)
    }
  }

  //Api de cep
  async function checkCep(){
    try{
      const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      setAddress(data.logradouro)
      setNbhd(data.bairro)
      setCity(data.localidade)
      setState(data.uf)
      
    }catch(error){
      console.log(error)
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mask.style}>
          <h2>Alterar Fornecedor</h2>
          <hr />
          <br />
          <div className='modal'>
            {/*Id e Nome*/}
            <div className='wrap-input-group'>
              <TextField className='id' label="Id" disabled
                value={id} onChange={(e) => setId(e.target.value)}
              />

              <TextField className='fornecedor' label="Fornecedor" type="text"
                value={supllier} onChange={(e) => setSupllier(e.target.value)}
              />
            </div>

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
                onBlur={checkCep}
                InputProps={{
                  inputComponent: mask.TextMaskCnpj,
                }}/>

              <TextField className="cep" label="CEP" type="text"
                value={cep} onChange={(e) => setCep(e.target.value)} 
                InputProps={{
                  inputComponent: mask.TextMaskCep,
                }}/>
            </div>

            <TextField className='endereco' label="Endereço" type="text"
              value={address} onChange={(e) => setAddress(e.target.value)} />

            <TextField className='bairro' label="Bairro" type="text"
              value={neighborhood} onChange={(e) => setNbhd(e.target.value)} />

            <div className='wrap-input-group'>
              <TextField className='cidade' label="Cidade" type="text"
                value={city} onChange={(e) => setCity(e.target.value)} />

              <TextField className="pais" label="País" type="text"
                value={state} onChange={(e) => setState(e.target.value)} />
            </div>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='alter' onClick={editSupllier}>Alterar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalEdit