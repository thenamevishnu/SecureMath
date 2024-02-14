import express from "express"
import env from "dotenv"
import cors from "cors"
import authProxyRouter from "./Routes/authProxy.route.mjs"
import transactionProxyRouter from "./Routes/transactionProxy.route.mjs"
import { AxiosInterceptor } from "./Middleaware/AxiosInterceptor.mjs"

env.config()

const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())
app.use(AxiosInterceptor)

app.use("/auth", authProxyRouter)
app.use("/transaction", transactionProxyRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log("Main server started ✅")
})