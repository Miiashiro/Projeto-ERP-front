import { useState } from "react"
import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent"
import "./start.css"

function Login() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <LayoutComponent>
            <span className="title-init">Login</span>

            <form>
                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input-login' : 'input-login'}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input className={senha !== "" ? 'has-val input-login' : 'input-login'}
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                <div className="containerButton">
                    <button>Entrar</button>
                </div>
            </form>


            <p><span>Esqueceu a senha? Clique aqui</span></p>

            <p><span>Não tem uma conta? Clique aqui</span></p>

        </LayoutComponent>
    )
}

export default Login