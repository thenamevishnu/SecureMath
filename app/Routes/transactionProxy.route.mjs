import { Router } from "express"
import { Authentication } from "../Middleaware/Authentication.mjs"
import transactionProxyController from "../Controllers/transactionProxy.controller.mjs"

const app = Router()

app.post("/transaction", Authentication, transactionProxyController.addTransaction)
app.get("/transactions", Authentication, transactionProxyController.getTransactions)

export default app