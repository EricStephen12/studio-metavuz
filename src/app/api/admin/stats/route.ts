import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Verify admin authentication
async function verifyAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json');
const BOOKINGS_FILE = path.join(process.cwd(), 'data', 'bookings.json');

// Read data from file
function readJsonFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = readJsonFile(CONTACTS_FILE);
    const bookings = readJsonFile(BOOKINGS_FILE);

    // Count images in public/images directory
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    let totalImages = 0;
    
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      totalImages = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      ).length;
    }

    const stats = {
      totalContacts: contacts.length,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((booking: any) => booking.status === 'pending').length,
      totalImages
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}