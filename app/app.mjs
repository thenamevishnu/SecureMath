import express from "express"
import env from "dotenv"
import cors from "cors"
import authProxyRouter from "./Routes/authProxy.route.mjs"
import transactionProxyRouter from "./Routes/transactionProxy.route.mjs"
import { AxiosInterceptor } from "./Middleaware/AxiosInterceptor.mjs"
import nodecron from "node-cron"
import axios from "axios"

env.config()

const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())
app.use(AxiosInterceptor)

app.get("/status", async (req, res) => {
    return res.status(200).send({ status: "OK"})
})

nodecron.schedule("* * * * *", async () => {
    const { data } = await axios.get(`${process.env.SERVER}/status`)
    console.log(data.status);
})

app.use("/auth", authProxyRouter)
app.use("/transaction", transactionProxyRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log("Main server started ✅")
})