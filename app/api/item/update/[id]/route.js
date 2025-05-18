import { NextResponse } from "next/server";
import connectDB from "@/app/utils/dataqbase";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request,context){
    const reqBody = await request.json() 
    try{
        const resolvedParams = await context.params; // await をつける
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id)
        
        if(singleItem.email === reqBody.email){
            await ItemModel.updateOne({_id:resolvedParams.id},reqBody)
            return NextResponse.json({message:"アイテム編集成功"})
        } else {
            return NextResponse.json({message:"他の人が作成したアイテムです"})
        }
    } catch {
        return NextResponse.json({message:"アイテム編集失敗"})
    }
}