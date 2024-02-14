import express from "express"
import env from "dotenv"
import cors from "cors"
import authRouter from "./Routes/auth.route.mjs"

env.config()

const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())

app.use("/", authRouter)

app.listen(process.env.AUTH_PORT || 4000, () => {
    console.log("Authentication server started ✅")
})