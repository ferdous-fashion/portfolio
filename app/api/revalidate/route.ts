import { NextResponse } from 'next/server'; import { z } from 'zod';
const schema=z.object({name:z.string().min(2).max(100),email:z.string().email(),subject:z.string().min(2).max(150),message:z.string().min(10).max(3000)});
export async function POST(req:Request){try{const data=schema.parse(await req.json()); console.log('Portfolio contact:',data); /* Connect Resend or store in Supabase here. */ return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Please complete all fields correctly.'},{status:400})}}
