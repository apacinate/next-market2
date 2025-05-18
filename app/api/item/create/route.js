import { NextResponse } from "next/server"
import connectDB from "@/app/utils/dataqbase"
import { ItemModel } from "../../../utils/schemaModels"

export async function POST(request){
    const reqBody = await request.json()
    console.log(reqBody)

    try{
        await connectDB()
        const newItem = await ItemModel.create(reqBody)
        console.log("保存結果:", newItem)
        return NextResponse.json({message:"アイテム作成成功"})
    } catch(error){
        console.log(error)
        return NextResponse.json({message:"アイテム作成失敗"})
    }
}

