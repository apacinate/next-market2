import { NextResponse } from "next/server"
import connectDB from "../../../utils/dataqbase"
import { UserModel } from "../../../utils/schemaModels"
import { SignJWT } from "jose"

    export async function POST(request){
        const reqBody = await request.json()
        await connectDB()
        const savedUserData = await UserModel.findOne({email:reqBody.email})
        try{
            if(savedUserData){
                if(reqBody.password===savedUserData.password){

                    const secretKey = new TextEncoder().encode("next-market-app-book")
                    const payload = {
                        email:reqBody.email
                    }
                    const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"}).setExpirationTime("1d").sign(secretKey)
                    return NextResponse.json({message:"ログイン成功",token:token})
                } else {
                    return NextResponse.json({message:"ログイン失敗：パスワードが間違っています"})
                }
                
            } else {
                return NextResponse.json({message:"ログイン失敗：ユーザー登録をしてください"})
            }
        } catch {
            return NextResponse.json({message:"ログイン失敗"})
        }

        
    }