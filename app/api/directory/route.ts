 
import { addDirectory, deleteDirectory, getDirectory } from "@/data/directoryDummyData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest):Promise<NextResponse<directoryType | null>> { 
  const id = request.nextUrl.searchParams.get('root') 
  
  
  const auth = request.headers.get('authorization') 
  if(!auth || !id) return NextResponse.json(null);  
  const dir = getDirectory(id)  
  return NextResponse.json(dir || null);
}

export async function POST(request: NextRequest) {
  const { name, root, index, type } = await request.json() as { root: string, name: string, index: number, type: folderTypeType }
  if(!name || !root || index === undefined  || !type) return NextResponse.json({data: null, success: false, message: 'unsuficient data required'});
  
  const data = addDirectory(root, name, index, type )
  if(!data) return NextResponse.json({data: null, success: false, message: 'failed to add'});
  return NextResponse.json({data, success: true, message: 'folder added'});
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(true);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json() as {id: string}
  if(!id) return NextResponse.json({success: false, message: 'unsuficient data required'});
  const success = deleteDirectory(id)
  if(success) return NextResponse.json({success: true, message: 'folder deleted'});
  NextResponse.json({success: false, message: 'failed to delete'});
}
