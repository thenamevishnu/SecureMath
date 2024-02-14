import express from "express"
import env from "dotenv"
import cors from "cors"
import authRouter from "./Routes/auth.route.mjs"
import * as db from "./Database/db.mjs"

env.config()
db.connect(process.env.AUTH_DB)

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