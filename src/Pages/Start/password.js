import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutComponent from "../../Components/LayoutStart/layoutComponent";
import api from "../../api"

function NewPassword(){

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    async function newPassword(e){
        e.preventDefault()

        try{
            const dataPass = {
                name, email
            }

            const {data} = await api.post('/user/redefinir', dataPass)
            alert(`Senha Alterada! Sua nova senha é: ${data.result[0].password}`)

        }catch(error){
            alert(`Erro ao gerar nova senha. Erro: ${error}`)
        }
    }

    return(
        <LayoutComponent title="Nova Senha">
            <div className="wrap-input">
                <input className={name !== "" ? 'has-val input-start' : 'input-start'}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <span className="focus-input" data-placeholder="Nome"></span>
            </div>

            <div className="wrap-input">
                <input className={email !== "" ? 'has-val input-start' : 'input-start'}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="container-button">
                <button onClick={newPassword}>Nova Senha</button>
            </div>

            <p><Link to="/">Voltar</Link></p>
        </LayoutComponent>
    )
}

export default NewPassword