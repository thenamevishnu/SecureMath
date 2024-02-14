import { authServer, transactionServer } from "../axiosInstance.mjs"

export const AxiosInterceptor = (req, res, next) => {
    const token = req.headers["authorization"]
    const service = req.url?.split("/")?.[1]
    if (service == "auth") {
        authServer.interceptors.request.use(config => {
            config.headers.Authorization = token
            return config
        })
    }
    if (service == "transaction") {
        transactionServer.interceptors.request.use(config => {
            config.headers.Authorization = token
            return config
        })
    }
    next()
}