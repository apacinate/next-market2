import { NextResponse } from "next/server";
import { jwtVerify } from "jose"

export async function middleware(request){
    console.log("ミドルウェア")
    console.log(request.headers.get("Authorization"))
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15M0BnbWFpbC5jb20iLCJleHAiOjE3NDc3MDAwMTl9.Wah1TBuPh4SNCNpWtSP13fBQoReC75N3csvzZiMvYTI"
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