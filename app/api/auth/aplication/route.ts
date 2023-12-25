import { AssigneRole, getApplications } from "@/data/credentialsData";
import authOptions from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET( ) { 
    const session = await getServerSession(authOptions)
    if(session?.user.role !== 'admin') return NextResponse.json({data: [], success: false, message: 'you are not an admin'}); 
    const data = getApplications()
    return NextResponse.json(data);  
}

export async function POST(request: NextRequest) {
    const { id } = await request.json() as { id: string  }
    if(id) return NextResponse.json({data: null, success: false, message: 'unsuficient data required'});
    const session = await getServerSession(authOptions)
    if(session?.user.role === 'user' || session?.user.role === 'member') {
        const response = AssigneRole(id, 'aplied')
        return NextResponse.json(response);  
    }
    return NextResponse.json({data: null, success: false, message: 'only for user or member'})
}