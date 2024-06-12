import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api"
import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent"
import "./start.css"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const data = {email, password}

            await api.post('/user', data)

            alert("Login afetuado com sucesso")
            navigate("/Home")
        }catch(error){
            alert(`algo deu errado. Erro: ${error}, revize os campos.`)
        }
    }

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
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </form>


            <p>Esqueceu a senha? <Link to="/NovaSenha">Clique aqui</Link></p>

            <p>Não tem uma conta? <Link to="/Cadastro">Clique aqui</Link></p>

        </LayoutComponent>
    )
}

export default Login