import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../axios"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"

const ChangePassword = () => {

    const { id: user_id } = jwtDecode(localStorage.getItem("__token__"))

    const [formData, setFormData] = useState({user_id: user_id, currentPassword: "", newPassword: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            for (let key in formData) {
                if (!formData[key]) {
                    return toast.error(`${key} is empty`)
                }
            }
            const { data } = await api.patch(`/auth/password/change`, formData)
            if (data.message == "success") {
                toast.success("Password chnaged")
                localStorage.removeItem("__token__")
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
                <h1 className="font-bold text-center">Change Password</h1>
                <input type="password" value={formData.currentPassword} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} placeholder="Current password" name="currentPassword" className="p-2 rounded-xl outline-none" />
                <input type="password" value={formData.newPassword} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} placeholder="New password" name="newPassword" className="p-2 rounded-xl outline-none" />
                <button className="bg-green-700 rounded-xl p-2 text-white">Login</button>
            </form>
        </div>
    )
}

export default ChangePassword
