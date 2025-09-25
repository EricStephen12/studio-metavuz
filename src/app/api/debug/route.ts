import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      NEXT_PUBLIC_EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_EMAIL_PASS: process.env.NEXT_PUBLIC_EMAIL_PASS ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_ADMIN_USERNAME: process.env.NEXT_PUBLIC_ADMIN_USERNAME ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    };

    // Check if nodemailer can be imported
    let nodemailerStatus = 'NOT AVAILABLE';
    try {
      const nodemailer = await import('nodemailer');
      nodemailerStatus = 'AVAILABLE';
    } catch (error) {
      nodemailerStatus = `ERROR: ${error}`;
    }

    return NextResponse.json({
      status: 'Debug API Working',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      nodemailer: nodemailerStatus,
      allEnvKeys: Object.keys(process.env).filter(key => 
        key.includes('EMAIL') || key.includes('ADMIN') || key.includes('NEXT_PUBLIC')
      ),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Debug API Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Test nodemailer configuration
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    // Test connection
    await transporter.verify();

    return NextResponse.json({
      status: 'Email configuration test successful',
      timestamp: new Date().toISOString(),
      emailUser: process.env.NEXT_PUBLIC_EMAIL_USER ? 'SET' : 'NOT SET',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Email configuration test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
