import React, {useState} from "react"
import "./form.css"
import TextField from '@mui/material/TextField'
import api from "../../../../api"

function Form(){

    const [id_prod, setIdProd] = useState("")
    const [quant, setQuant] = useState("")
    const [dateSale, setDateSale] = useState("")

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
    
      async function save(){
        try{
          await api.post('/lista/salvar')
          await api.delete('/lista/lista')
    
          alert("Salvo com sucesso")
        }catch(error){
          alert(`Erro ao cadastrar venda. Reveja os campos. Erro ${error}`)
        }
      }

    return(
        <div className='nsei'>
            <div className='inputs'>
              <div className='wrap-input-venda'>
                <TextField type="text" label="Nome" variant="standard" className='standart'
                  value={id_prod} onChange={(e) => setIdProd(e.target.value)} />
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