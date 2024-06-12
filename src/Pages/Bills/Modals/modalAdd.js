import { Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import './modals.css'
import api from '../../../api';
import { NumericFormat } from 'react-number-format';

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

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        //perguntar o que fica melhor
        decimalScale={2} 
        fixedDecimalScale={true}

        thousandSeparator=","
        allowedDecimalSeparators={['.']}
        prefix="R$"
      />
    );
  },
);

const ModalAdd = () => {

  const [open, setOpen] = useState(false)
  const [bill, setBill] = useState("")
  const [price, setPrice] = useState("")
  const [date, setDate] = useState("")

  const toggle = () => setOpen(!open)

  async function addBill(){
    try{
      const data = {
        bill, price, date
      }

      await api.post('/conta', data)
      alert("Conta cadastrada")

      window.location.reload()
    }catch(error){
      alert(`Erro ao cadastrar. Erro ${error}`)
    }
  }

  return (
    <>
      <button className='buttonOpen' onClick={toggle}>ADICIONAR</button>

      <Modal
        open={open}
        onClose={toggle}
      >
        <Box sx={style}>
          <h2>Adicionar Conta</h2>
          <hr />
          <br />
          <div className='modal'>

            <TextField className='conta' label="Conta" type="text"
              value={bill} onChange={(e) => setBill(e.target.value)}/>

            <TextField className='preco' label="Valor" 
              value={price} onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}/>

            <TextField className='data' type="date" 
              value={date} onChange={(e) => setDate(e.target.value)}/>

            <div className='group-buttons'>
              <button className='close' onClick={toggle}>Fechar</button>

              <button className='add' onClick={addBill}>Adicionar</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalAdd