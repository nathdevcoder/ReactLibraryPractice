import { SignUp } from "@/data/credentialsData";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { name, password } = await request.json() as {  name: string, password: string }
    if(!name || !password ) return NextResponse.json({data: null, success: false, message: 'unsuficient data required'});
    const response = SignUp(name, password)
    return NextResponse.json(response);  
  }