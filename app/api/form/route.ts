import { admin, user } from "@/constant/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { 
  const typename = request.nextUrl.searchParams.get('type') 
  console.log(request.headers.get('authorization'));
  if(typename === 'user') return NextResponse.json(user);
  else return NextResponse.json(admin);
}

export async function POST(request: NextRequest) {
  const {name, id, type} = await request.json() as {name: string, id: number, type: "admin" | "user" | 'all'}
  console.log('run?');
  
  
  if(type && type == 'admin') admin.push({name, id})
  if(type && type == 'user') user.push({name, id}) 
  if(type && type == 'all') {
    user.push({name, id}) 
    admin.push({name, id})
  }


  console.log(type, name, id);
  
  
  return NextResponse.json({name, id});
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(true);
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(true);
}
