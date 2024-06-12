import { Navigate, Outlet } from "react-router-dom"

function ProtectedRouter(){
    
    const auth = sessionStorage.getItem("Login")

    return(
        auth ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRouter