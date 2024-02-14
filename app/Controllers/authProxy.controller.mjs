import { authServer } from "../axiosInstance.mjs"

const signup = async (req, res) => {
    try {
        const { data: response } = await authServer.post("/signup", req.body)
        return res.send(response)
    } catch (err) {
        return res.status(500).send({
            message: err.response?.data?.message || err.message || "Internal server error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { data: response } = await authServer.get("/login", {
            params: req.query
        })
        return res.send(response)
    } catch (err) {
        return res.status(500).send({
            message: err.response?.data?.message || err.message || "Internal server error"
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { data: response } = await authServer.patch("/password/change", req.body)
        return res.send(response)
    } catch (err) {
        return res.status(500).send({
            message: err.response?.data?.message || err.message || "Internal server error"
        })
    }
}

export default {
    signup,
    login,
    changePassword
}