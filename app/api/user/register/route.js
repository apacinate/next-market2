import { UserModel } from "@/app/utils/schemaModels"
import { NextResponse } from "next/server"
import connectDB from "@/app/utils/dataqbase";

export async function POST(request){
    const reqBody = await request.json()

    try{
        await connectDB()
        await UserModel.create(reqBody)
        return NextResponse.json({message:"ユーザー登録成功"})
    } catch{
        return NextResponse.json({message:"ユーザー登録失敗"})
    }

}
   