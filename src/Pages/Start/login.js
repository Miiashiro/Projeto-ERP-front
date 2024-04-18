import { useState } from "react"
import { Link } from "react-router-dom"
import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent"
import "./start.css"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <LayoutComponent title="Login">
            <form>
                {/*Email*/}
                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input-start' : 'input-start'}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                {/*Senha*/}
                <div className="wrap-input">
                    <input className={password !== "" ? 'has-val input-start' : 'input-start'}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                {/*Botao para entrar no sistema */}
                <div className="container-button">
                    <button>Entrar</button>
                </div>
            </form>


            <p>Esqueceu a senha? Clique aqui</p>

            <p>Não tem uma conta? <Link to="/Cadastro">Clique aqui</Link></p>

        </LayoutComponent>
    )
}

export default Login