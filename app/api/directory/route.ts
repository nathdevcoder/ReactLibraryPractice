 
import { addDirectory, deleteDirectory, getDirectory, renameFolder } from "@/data/directoryDummyData";
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

export async function PATCH(request: NextRequest) {
  const  {root, name, type} = await request.json() as {root: string, name: string, type: "Rename"}
  if(!root) return NextResponse.json({data: null, success: false, message: 'unsuficient data required'});
  if(type === 'Rename') {
    const renamed = renameFolder(root, name)
    return NextResponse.json({data: null, success: renamed, message: renamed ? 'folder renamed' : 'something went wrong'});
  }
  return NextResponse.json({data: null, success: false, message: 'unsuficient data required'});
}

export async function DELETE(request: NextRequest) { 
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id')
  if(!id) return NextResponse.json({success: false, message: 'unsuficient data required'});
  const success = deleteDirectory(id)
  if(success) return NextResponse.json({data: null, success: true, message: 'folder deleted'});
  return NextResponse.json({data: null, success: false, message: 'failed to delete'});
}