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

const BOOKINGS_FILE = path.join(process.cwd(), 'data', 'bookings.json');

// Read bookings from file
function readBookings() {
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
  const dataDir = path.dirname(BOOKINGS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const bookings = readBookings();
    const bookingIndex = bookings.findIndex((booking: any) => booking.id === id);

    if (bookingIndex === -1) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    bookings[bookingIndex].status = status;
    writeBookings(bookings);

    return NextResponse.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const bookings = readBookings();
    const filteredBookings = bookings.filter((booking: any) => booking.id !== id);

    if (bookings.length === filteredBookings.length) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    writeBookings(filteredBookings);

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Booking delete error:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}