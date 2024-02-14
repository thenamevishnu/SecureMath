import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../axios"
import toast from "react-hot-toast"
import { jwtDecode } from "jwt-decode"

const Transaction = () => {

    const { id: user_id } = jwtDecode(localStorage.getItem("__token__"))

    const [formData, setFormData] = useState({ firstNumber: "", secondNumber: "", user_id: user_id })
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate()

    const resetState = () => {
        setFormData({ firstNumber: "", secondNumber: "", user_id: user_id })
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await api.get("/transaction/transactions", {
                params: { user_id: user_id }
            })
            console.log(data);
            if (data.result) {
                setTransactions(data.result)
            } else {
                return toast.err("Error while fetching transactions")
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            for (let key in formData) {
                if (!formData[key]) {
                    return toast.error(`${key} is empty`)
                }
            }
            formData.firstNumber = parseFloat(formData.firstNumber)
            formData.secondNumber = parseFloat(formData.secondNumber)
            const { data } = await api.post(`/transaction/transaction`, formData)
            if (data.result) {
                setTransactions((prev) => ([data.result, ...prev]))
                resetState()
            } else {
                return toast.error(data.message)
            }
        } catch (err) {
            return toast.error(err.response?.data?.message || err.message)
        }
    }

    return (
        <div className="flex items-center px-2 flex-col">
            <span className="bg-red-600 absolute top-1 right-1 cursor-pointer text-sm text-white p-1 rounded-full" onClick={() => {
                localStorage.removeItem("__token__")
                navigate("/login", {
                    replace: true
                })
            }}>Logout</span>
            <span className="bg-violet-600 absolute top-1 left-1 cursor-pointer text-sm text-white p-1 rounded-full" onClick={() => {
                navigate("/settings/change-password", {
                    replace: true
                })
            }}>Settings</span>
            <form className="mt-10 flex flex-col gap-4 p-5 bg-[#ccc] rounded-xl w-full sm:w-[500px]" onSubmit={handleSubmit}>
                <h1 className="font-bold text-center">History</h1>
                <input type="text" value={formData.firstNumber} onChange={e => setFormData({ ...formData, [e.target.name]: (e.target.value) })} placeholder="First Number" name="firstNumber" className="p-2 rounded-xl outline-none" />
                <input type="text" value={formData.secondNumber} onChange={e => setFormData({ ...formData, [e.target.name]: (e.target.value) })} placeholder="Second Number" name="secondNumber" className="p-2 rounded-xl outline-none" />
                <button className="bg-green-700 rounded-xl p-2 text-white">Submit</button>
            </form>
            <div className="mt-4 bg-[#ddd] p-3 flex flex-col gap-2 sm:w-[500px] rounded-xl">
                <h1 className="text-center font-bold mb-2">History</h1>
                {
                    transactions.map(item => {
                        return (
                            <div key={item._id} className="bg-[#eee] p-2 rounded-xl font-mono">
                                {item.first_number} + {item.second_number} = {item.result}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Transaction
