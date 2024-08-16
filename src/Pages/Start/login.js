import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api"
import LayoutComponent from "../../Components/LayoutStart/layoutComponent"
import "./start.css"
const Swal = require('sweetalert2')

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const dataLogin = {email, password}

            const {data} = await api.post('/user/login', dataLogin)

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login feito com sucesso!"
              })

            sessionStorage.setItem("Token", data.token)
            
            navigate("/Home")
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Senha ou email invalidos.`,
              })
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

            <p>Não tem uma conta? <Link to="/Cadastro">Clique aqui</Link></p>

        </LayoutComponent>
    )
}

export default Login