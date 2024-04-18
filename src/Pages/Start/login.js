import { useState } from "react"
import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent"
import "./start.css"

function Login() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <LayoutComponent title="Login">
            <form>
                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input-start' : 'input-start'}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input className={senha !== "" ? 'has-val input-start' : 'input-start'}
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                <div className="container-button">
                    <button>Entrar</button>
                </div>
            </form>


            <p>Esqueceu a senha? Clique aqui</p>

            <p>Não tem uma conta? Clique aqui</p>

        </LayoutComponent>
    )
}

export default Login