import { Box, Modal, TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import api from '../../../api';
import "./modal.css"
import { IMaskInput } from 'react-imask';

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

const TextMaskTel = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00)0000-0000"
      /*definitions={{
        '#': /[1-9]/,
      }}*/
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const TextMaskCnpj = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00.000.000/0000-00"
      /*definitions={{
        '#': /[1-9]/,
      }}*/
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const TextMaskCep = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00000-000"
      /*definitions={{
        '#': /[1-9]/,
      }}*/
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

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
  const [country, setCountry] = useState("")

  const toggle = () => setOpen(!open)
  
  const selectSupllier = (params) => {
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
    setCountry(params.row.pais)
  }

  async function editSupllier(){
    try{
      const data = {
        id, supllier, email, tel, cnpj, cep, address, neighborhood, city, country
      }

      await api.put('/fornecedor', data)

      alert("Fornecedor alterado!")

      window.location.reload()

    }catch(error){
      alert(`Erro ao atualiar. Erro ${error}.`)
    }
  }

  return (
    <>
      <GridActionsCellItem
        icon={<FaEdit />}
        label="Edit"
        onClick={() => selectSupllier(params)}
      />

      <Modal open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  inputComponent: TextMaskTel,
                }}/>
            </div>

            <div className='wrap-input-group'>
              <TextField className='cnpj' label="CNPJ" type="text"
                value={cnpj} onChange={(e) => setCnpj(e.target.value)} 
                InputProps={{
                  inputComponent: TextMaskCnpj,
                }}/>

              <TextField className="cep" label="CEP" type="text"
                value={cep} onChange={(e) => setCep(e.target.value)} 
                InputProps={{
                  inputComponent: TextMaskCep,
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
                value={country} onChange={(e) => setCountry(e.target.value)} />
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