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

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(CONTACTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read contacts from file
function readContacts() {
  ensureDataDir();
  if (!fs.existsSync(CONTACTS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
}

export async function GET() {
  try {
    if (!await verifyAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = readContacts();
    
    // Sort by creation date (newest first)
    contacts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Contacts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}