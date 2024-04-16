import LayoutComponent from "../../Components/LayoutComponentStart/layoutComponent"

function Login() {
    return (
        <LayoutComponent>
            <span>Login</span>

            <form>
                <div className="wrap-input">
                    <input />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input />
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                <div className="containerButton">
                    <button>Entrar</button>
                </div>
            </form>

            <div className="links">
                <p><span>Esqueceu a senha? Clique aqui</span></p>

                <p><span>Não tem uma conta? Clique aqui</span></p>
            </div>
        </LayoutComponent>
    )
}

export default Login