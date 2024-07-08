import React, { useEffect, useState } from "react"
import "./form.css"
import TextField from '@mui/material/TextField'
import api from "../../../../api"
import Autocomplete from '@mui/material/Autocomplete';

function Form() {

  const [data, setData] = useState([])
  const [prod, setProd] = useState("")
  const [quant, setQuant] = useState("")
  const [dateSale, setDateSale] = useState("")
  const token = sessionStorage.getItem("Token")

  //Pegar nome dos produtos
  async function getData() {
    const { data } = await api.get('/produto', { headers: { 'Authorization': `Bearer ${token}` } })
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  //Adicionar a venda na lista
  async function addSale() {
    try {
      const data = {
        prod, quant, dateSale
      }

      await api.post('/lista/adicionar', data)

      setProd("")
      setQuant("")
      setDateSale("")

    } catch (error) {
      alert(`Erro ao cadastrar venda. Erro ${error}`)
    }
  }

  //Salvar lista de vendas
  async function save() {
    try {
      await api.post('/lista/salvar')

      //apaga a lista
      await api.delete('/lista/lista')

      alert("Salvo com sucesso")
    } catch (error) {
      alert(`Erro ao cadastrar venda. Reveja os campos. Erro ${error}`)
    }
  }

  //Array para o input de autoComplete
  const autoComplete = data.map((row) => (
    {
      id: row,
      label: row.product_name
    }
  ))

  return (
    <div className='form-venda'>
      <div className='inputs'>
        <div className='wrap-input-venda'>
          <Autocomplete disablePortal options={autoComplete}
            renderInput={(params) => <TextField {...params} label="Produto" variant="standard" />}
            className='standart'
            inputValue={prod}
            onInputChange={(event, newInputValue) => {
              setProd(newInputValue);
            }} 
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}/>
        </div>

        <div className='wrap-input-venda'>
          <TextField type="number" label="Quantidade" variant="standard" className='standart'
            value={quant} onChange={(e) => setQuant(e.target.value)} />
        </div>

        <div className='wrap-input-venda'>
          <TextField type="date" variant="standard" className='data'
            value={dateSale} onChange={(e) => setDateSale(e.target.value)} />
        </div>

        <button className='adicionar' onClick={addSale}>Adicionar</button>
      </div>

      <button className='salvar' onClick={save}>SALVAR</button>
    </div>
  )
}

export default Form