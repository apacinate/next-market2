import connectDB from "@/app/utils/dataqbase";
import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request, context) {
    try {
        const resolvedParams = await context.params; // await をつける
        await connectDB();

        const singleItem = await ItemModel.findById(resolvedParams.id);
        return NextResponse.json({message:"アイテム読み取り成功（シングル）",singleItem:singleItem})
    } catch {
        return NextResponse.json({message:"アイテム読み取り失敗（シングル）"})
    }
}