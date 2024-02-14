import { BrowserRouter, Routes as Routers, Route } from "react-router-dom"
import LoginPage from "../Pages/LoginPage"
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute"
import SignupPage from "../Pages/SignupPage"
import TransactionPage from "../Pages/TransactionPage"

const Routes = () => {
    return (
        <BrowserRouter>
            <Routers>
                <Route path="/">
                    <Route path="/login" element={<ProtectedRoute login> <LoginPage /> </ProtectedRoute>} />
                    <Route path="/signup" element={<ProtectedRoute signup> <SignupPage /> </ProtectedRoute>} />
                    <Route path="/transaction" element={<ProtectedRoute> <TransactionPage /> </ProtectedRoute>} />
                </Route>
            </Routers>
        </BrowserRouter>
    )
}

export default Routes
