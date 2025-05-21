"use client"
import { useState, useEffect  } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "../../../utils/useAuth"


const DeleteItem = (context) => {
    const [title,setTitle] = useState("")
    const [price,setPrice] = useState("")
    const [image,setImage] = useState("")
    const [email,setEmail] = useState("")
    const [description,setDescription] = useState("")
    
    const router = useRouter()
    const loginUserEmail = useAuth()

    const getSingleItem = async(id) => {
        const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,{chache:"no-store"})
        const jsonData = await response.json()
        const singleItem = jsonData.singleItem
        setTitle(singleItem.title)
        setPrice(singleItem.price)
        setImage(singleItem.image)
        setDescription(singleItem.description)
        setEmail(singleItem.email)
    }

    useEffect(() => {
        const fetchData = async () => {
        await getSingleItem(context.params.id)
        }
        fetchData()
    }, [context.params.id])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`,{
                method:"DELETE",
                headers:{
                    "Accept":"application",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    title:title,
                    price:price,
                    image:image,
                    description:description,
                    email:loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
            router.refresh()
        } catch{
            alert("アイテム削除失敗")
        }
    }
    
    if(loginUserEmail === email){
        return(
            <div>
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <Image src={image} width={750} height={500} alt="item-image" priority/>
                    <h3>\{price}</h3>
                    <p>{description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default DeleteItem