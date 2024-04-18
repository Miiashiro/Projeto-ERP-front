import { useState } from "react"
import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent"

function Registration(){

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return(
        <LayoutComponent title="Cadastro">
            <form>
                <div className="wrap-input">
                    <input className={nome !== "" ? 'has-val input-start' : 'input-start'}
                           type="text"
                           value={nome}
                           onChange={(e) => setNome(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input-start' : 'input-start'}
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input className={senha !== "" ? 'has-val input-start' : 'input-start'}
                           type="password"
                           value={senha}
                           onChange={(e) => setSenha(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                <div className="container-button">
                    <button>Cadastrar</button>
                </div>
            </form>

            <p>Voltar</p>
        </LayoutComponent>
    )
}

export default Registration