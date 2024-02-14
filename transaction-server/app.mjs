import express from "express"
import env from "dotenv"
import cors from "cors"
import transactionRouter from "./Routes/transaction.route.mjs"

env.config()

const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())

app.use("/", transactionRouter)

app.listen(process.env.TRANSACTION_PORT || 5000, () => {
    console.log("Transaction server started ✅")
})