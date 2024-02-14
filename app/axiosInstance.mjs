import axios from "axios";
import env from "dotenv"

env.config()

export const authServer = axios.create({
    baseURL: process.env.AUTH_SERVER 
})

export const transactionServer = axios.create({
    baseURL: process.env.TRANSACTION_SERVER
})