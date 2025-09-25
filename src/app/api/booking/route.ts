import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const BOOKINGS_FILE = path.join(process.cwd(), 'data', 'bookings.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(BOOKINGS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read bookings from file
function readBookings() {
  ensureDataDir();
  if (!fs.existsSync(BOOKINGS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

// Write bookings to file
function writeBookings(bookings: any[]) {
  ensureDataDir();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    // Debug logging
    console.log('=== BOOKING API DEBUG ===');
    console.log('Environment variables:', {
      EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER ? 'SET' : 'NOT SET',
      EMAIL_PASS: process.env.NEXT_PUBLIC_EMAIL_PASS ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    });

    const { 
      name, 
      email, 
      phone, 
      service, 
      date, 
      time, 
      duration, 
      message 
    } = await request.json();

    console.log('Booking data received:', { name, email, phone, service, date, time });

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Store booking in local file
    const bookings = readBookings();
    const newBooking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      service,
      date,
      time,
      duration: duration || null,
      message: message || null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    writeBookings(bookings);

    // Create transporter
    console.log('Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    console.log('Testing email connection...');
    await transporter.verify();
    console.log('Email connection verified successfully');

    // Email content
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: 'Studiometavuz@gmail.com', // Studio email
      subject: `New Booking Request: ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            New Studio Booking Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Client Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #06b6d4; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Booking Details:</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> ${duration || 'Not specified'}</p>
          </div>
          
          ${message ? `
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #06b6d4; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Additional Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <p style="color: #666; margin: 0;">
              This booking request was sent from the Studio Metavuz booking form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return NextResponse.json(
      { message: 'Booking request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('=== BOOKING API ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to send booking request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}