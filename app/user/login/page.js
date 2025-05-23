"use client"
import { useState } from "react"
const Login=()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(
                    {
                        email:email,
                        password:password
                    })
            })
            const jsonData = await response.json()
            console.log(jsonData)
            localStorage.setItem("token",jsonData.token)
            alert(jsonData.message)
        } catch{

        }
    }

    return(
        <div>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" plceholder="メールアドレス" required/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" name="password" plceholder="パスワード" required/>
                <button>ログイン</button>
            </form>
        </div>
    )
}
export default Login