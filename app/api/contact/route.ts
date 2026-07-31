import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const schema=z.object({name:z.string().min(2).max(100),email:z.string().email(),subject:z.string().min(2).max(150),message:z.string().min(10).max(3000)});
export async function POST(req:Request){
  try {
    const data=schema.parse(await req.json());
    const apiKey=process.env.RESEND_API_KEY, to=process.env.CONTACT_TO_EMAIL;
    if(!apiKey||!to) return NextResponse.json({error:'The contact email service has not been configured yet.'},{status:503});
    const resend=new Resend(apiKey);
    const {error}=await resend.emails.send({
      from:process.env.CONTACT_FROM_EMAIL||'Portfolio Contact <onboarding@resend.dev>',
      to:[to], replyTo:data.email,
      subject:`Portfolio: ${data.subject}`,
      text:`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    });
    if(error) return NextResponse.json({error:'Message could not be delivered. Please try again later.'},{status:502});
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({error:'Please complete all fields correctly.'},{status:400}); }
}
