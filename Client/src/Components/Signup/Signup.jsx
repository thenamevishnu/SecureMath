import { useState } from "react"
import toast from "react-hot-toast"
import { api } from "../../axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const [formData, setFormData] = useState({ username: "", password: "", confirm_password: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            for (let key in formData) {
                if (!formData[key]) {
                    return toast.error(`${key} is empty`)
                }
            }
            const { data } = await api.post(`/auth/signup`, formData)
            if (data.result) {
                toast.success("Account Created!")
                navigate("/login", {
                    replace: true
                })
            } else {
                return toast.error(data.message)
            }
        } catch (err) {
            return toast.error(err.response?.data?.message || err.message)
        }
    }

    return (
        <div className="w-screen flex justify-center px-2">
            <form className="mt-10 flex flex-col gap-4 p-5 bg-[#ccc] rounded-xl w-full sm:w-[500px]" onSubmit={handleSubmit}>
                <h1 className="font-bold text-center">SignUp</h1>
                <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} placeholder="username" name="username" className="p-2 rounded-xl outline-none" />
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} placeholder="password" name="password" className="p-2 rounded-xl outline-none" />
                <input type="password" value={formData.confirm_password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} placeholder="confirm password" name="confirm_password" className="p-2 rounded-xl outline-none" />
                <button className="bg-green-700 rounded-xl p-2 text-white">Signup</button>
            </form>
        </div>
    )
}

export default Signup
