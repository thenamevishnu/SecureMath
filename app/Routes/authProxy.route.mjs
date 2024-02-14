import { Router } from "express"
import authProxyController from "../Controllers/authProxy.controller.mjs"
import { Authentication } from "../Middleaware/Authentication.mjs"

const app = Router()

app.post("/signup", authProxyController.signup)
app.get("/login", authProxyController.login)

app.patch("/password/change", Authentication, authProxyController.changePassword)

export default app