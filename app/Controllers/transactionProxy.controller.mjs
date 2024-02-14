import { transactionServer } from "../axiosInstance.mjs"

const addTransaction = async (req, res) => {
    try {
        const { data: response } = await transactionServer.post("/transaction", req.body)
        return res.send(response)
    } catch (err) {
        return res.status(500).send({
            message: err.response?.data?.message || err.message || "Internal server error"
        })
    }
}

const getTransactions = async (req, res) => {
    try {
        const { data: response } = await transactionServer.get("/transactions", {
            params: req.query
        })
        return res.send(response)
    } catch (err) {
        return res.status(500).send({
            message: err.response?.data?.message || err.message || "Internal server error"
        })
    }
}

export default {
    addTransaction,
    getTransactions
}