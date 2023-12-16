
import getDirectories from "@/data/directoryDummyData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest):Promise<NextResponse<directoryType[] | null>> {  
    const auth = request.headers.get('authorization') 
    if(!auth) return NextResponse.json(null);  
    const dir = getDirectories()  
    return NextResponse.json(dir || null);
  }