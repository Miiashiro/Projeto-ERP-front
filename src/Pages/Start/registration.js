import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../../api"
import LayoutComponent from "../../Components/LayoutStart/layoutComponent"
const Swal = require('sweetalert2')

function Registration(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function createUser(e){
        e.preventDefault()

        try{
            const data = { name, email, password }

            await api.post('/user/cadastro', data)

            Swal.fire({
                position: "absolute",
                icon: "success",
                title: "Conta cadastrada"
              })

            setName("")
            setEmail("")
            setPassword("")
        }catch(error){
            Swal.fire({
                position: "absolute",
                icon: "error",
                title: `Erro ao adicionar conta, reveja os campos!`
              })
        }
    }

    return(
        <LayoutComponent title="Cadastro">
            <form>
                {/*Nome */}
                <div className="wrap-input">
                    <input className={name !== "" ? 'has-val input-start' : 'input-start'}
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                {/*Email */}
                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input-start' : 'input-start'}
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                {/*Senha */}
                <div className="wrap-input">
                    <input className={password !== "" ? 'has-val input-start' : 'input-start'}
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                {/*Botao para cadastrar */}
                <div className="container-button">
                    <button onClick={createUser}>Cadastrar</button>
                </div>
            </form>

            <p><Link to="/">Voltar</Link></p>
        </LayoutComponent>
    )
}

export default Registration