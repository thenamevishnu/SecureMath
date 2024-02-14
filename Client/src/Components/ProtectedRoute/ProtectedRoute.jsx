import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, login, signup }) => {

    const token = localStorage.getItem("__token__")

    if (token) {
        if (signup || login) {
            return <Navigate to={"/"} />
        } else {
            return children
        }
    } else {
        if (signup || login) {
            return children
        } else {
            return <Navigate to={"/login"} />
        }
    }
}

export default ProtectedRoute
