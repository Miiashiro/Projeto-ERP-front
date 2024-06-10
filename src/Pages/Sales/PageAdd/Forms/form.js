import React, {useEffect, useState} from "react"
import "./form.css"
import TextField from '@mui/material/TextField'
import api from "../../../../api"
import { Autocomplete } from "@mui/material"

function Form(){

    const [data, setData] = useState([])
    const [id_prod, setIdProd] = useState("")
    const [quant, setQuant] = useState("")
    const [dateSale, setDateSale] = useState("")

    //Pegar nome dos produtos
    async function getData(){
      const {data} = await api.get('/produto')
      setData(data)
    }

    useEffect(() => {
      getData()
    }, [])

    //Adicionar a venda na lista
    async function addSale() {
        try {
          const data = {
            id_prod, quant, dateSale
          }
    
          await api.post('/lista/adicionar', data)
    
          setIdProd("")
          setQuant("")
          setDateSale("")
          
        }catch(error){
          alert(`Erro ao cadastrar venda. Erro ${error}`)
        }
      }
    
      //Salvar lista de vendas
      async function save(){
        try{
          await api.post('/lista/salvar')

          //apaga a lista
          await api.delete('/lista/lista')
    
          alert("Salvo com sucesso")
        }catch(error){
          alert(`Erro ao cadastrar venda. Reveja os campos. Erro ${error}`)
        }
      }

      //Array para o input de autoComplete
      const autoComplete = data.map((row) => (
        {
          label: row.product_name
        }
      ))

    return(
        <div className='nsei'>
            <div className='inputs'>
              <div className='wrap-input-venda'>
                <Autocomplete disablePortal options={autoComplete}
                  renderInput={(params) => <TextField {...params} label="Movie" variant="standard" />} 
                  className='standart'
                  value={id_prod} onChange={(e) => setIdProd(e.target.value)}/>
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

            <button className='salvar' onClick={save}>Salvar</button>
          </div>
    )
}

export default Form