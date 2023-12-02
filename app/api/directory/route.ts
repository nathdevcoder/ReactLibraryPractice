 
import getDirectory from "@/data/directoryDummyData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest):Promise<NextResponse<directoryType | null>> { 
  const id = request.nextUrl.searchParams.get('root') 
  
  
  const auth = request.headers.get('authorization') 
  if(!auth || !id) return NextResponse.json(null);  
  const dir = getDirectory(id)  
  return NextResponse.json(dir || null);
}