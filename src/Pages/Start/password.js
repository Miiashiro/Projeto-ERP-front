import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent";

function NewPassword(){

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    return(
        <LayoutComponent title="Nova Senha">
            <div className="wrap-input">
                <input className={name !== "" ? 'has-val input-start' : 'input-start'}
                    type="email"
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
                <button>Nova Senha</button>
            </div>

            <p><Link to="/">Voltar</Link></p>
        </LayoutComponent>
    )
}

export default NewPassword