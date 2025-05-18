import { NextResponse } from "next/server";
import { jwtVerify } from "jose"

export async function middleware(request){
    console.log("ミドルウェア")
    //const token = await request.headers.get("Authorization")?.split(" ")[1]
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15MkBnbWFpbC5jb20iLCJleHAiOjE3NDc2OTM1MjB9.NdS-lwGfgGHQF3huufFzB7FJ247nB72sLNjnXg-LVuQ"
    if(!token){
         return NextResponse.json({message:"トークンがありません"})
    }

    try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodeJwt = await jwtVerify(token,secretKey)
        return NextResponse.next()
    } catch {
        return NextResponse.json({message:"トークンが正しくないので、ログインしてください"})
    }
}

export const config = {
    matcher:["/api/item/create","/api/item/update","/api/item/delete/:path*"],
}